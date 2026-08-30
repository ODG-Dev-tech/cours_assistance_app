import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import { canCreateFiche } from '@/utils/subscription'
import { getEmbedding } from '@/utils/embedding'

const generateFicheTool = {
    type: 'function',
    function: {
        name: 'generate_fiche_details',
        description:
            'Génère le déroulement détaillé et les références documentaires d\'une fiche pédagogique conforme au format MENAPLN (Approche Pédagogique Intégratrice) du Burkina Faso.',
        parameters: {
            type: 'object',
            properties: {
                documents: {
                    type: 'string',
                    description: "Nom du/des document(s) de référence utilisé(s) pour construire cette fiche.",
                },

                deroulement: {
                    type: 'array',
                    items: {
                        type: 'object',
                        properties: {
                            phase: {
                                type: 'string',
                                description: "Ex: 'Phase de présentation', 'Phase de développement', 'Évaluation'",
                            },
                            etape: { type: 'string', description: "Ex: 'Rappel de la leçon précédente'" },
                            duree: { type: 'string', description: "Ex: '2mn'" },
                            roleEnseignant: {
                                type: 'string',
                                description:
                                    "Les actions/consignes de l'enseignant pour cette étape. IMPORTANT : sépare chaque action ou question distincte par un retour à la ligne (\\n), plutôt qu'un seul paragraphe continu — ex: 'Présente le texte.\\nFait lire silencieusement.\\nPose les questions : ...'",
                            },
                            activitesApprenant: {
                                type: 'string',
                                description:
                                        "Les réponses/actions attendues des apprenants pour cette étape. Même règle : un retour à la ligne (\\n) entre chaque élément distinct plutôt qu'un bloc continu."
                            }
                    },
                        required: ['phase', 'etape', 'duree', 'roleEnseignant', 'activitesApprenant'],
                    },
                },
                activitesProlongement: { type: 'string' },
            },
            required: ['deroulement'],
        },
    },
}

export async function POST(request: Request) {
    const cookieStore = await cookies()
    const supabase = createClient(cookieStore)

    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
        return NextResponse.json({ error: 'Non authentifié' }, { status: 401 })
    }

    
    const access = await canCreateFiche(supabase, user.id)
    if (!access.allowed) {
        return NextResponse.json(
            { error: 'Quota de fiches gratuites atteint. Un abonnement est nécessaire.' },
            { status: 403 }
        )
    }

    const body = await request.json()
    const { discipline, matiere, niveau, theme, titre, objectifs, materiels, duree, methodes, champsObservation } = body

    if (!discipline || !niveau || !theme || !titre) {
        return NextResponse.json({ error: 'Champs obligatoires manquants.' }, { status: 400 })
    }

    const searchQuery = `${discipline} ${matiere ?? ''} ${niveau} ${theme} ${titre} ${objectifs ?? ''}`.trim()
    const queryEmbedding = await getEmbedding(searchQuery, 'query')

        const { data: retrievedChunks } = await supabase.rpc('match_document_chunks', {
            query_embedding: queryEmbedding,
            match_discipline: discipline,
            match_matiere: matiere ?? null,
            match_level: niveau,
            match_count: 3,
        })

        const ragContext = retrievedChunks?.length
            ? retrievedChunks
                .map((c: { document_title: string; chunk_text: string }) => `--- Extrait de "${c.document_title}" ---\n${c.chunk_text}`)
                .join('\n\n')
            : "Aucune référence trouvée dans le corpus pour cette combinaison discipline/niveau — base-toi sur les bonnes pratiques de l'Approche Pédagogique Intégratrice."
    
    const userPrompt = `
    Voici des exemples réels de fiches similaires, à utiliser comme référence de style et de structure :
    ${ragContext}
    Discipline : ${discipline}
    ${matiere ? `Matière : ${matiere}\n` : ''}Niveau : ${niveau}
    Thème : ${theme}
    Titre : ${titre}
    Objectifs d'apprentissage : ${objectifs || 'non précisés'}
    Matériels / supports : ${materiels || 'non précisés'}
    Durée : ${duree?.join(', ') || 'non précisée'}
    Méthode / technique : ${methodes?.join(', ') || 'non précisée'}
    Champ d'observation : ${champsObservation?.join(', ') || 'non précisé'}

    Génère le déroulement détaillé de cette leçon, conforme à l'Approche Pédagogique Intégratrice du Burkina Faso.
        `.trim()

    try {
        const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
                'Content-Type': 'application/json',
                'HTTP-Referer': 'http://localhost:3000', 
                'X-Title': 'Fiches+',
            },
            body: JSON.stringify({
                model: 'anthropic/claude-haiku-4.5',
                messages: [{ role: 'user', content: userPrompt }],
                tools: [generateFicheTool],
                tool_choice: { type: 'function', function: { name: 'generate_fiche_details' } },
            }),
        })

        if (!response.ok) {
            const errText = await response.text()
            console.error('Erreur OpenRouter:', response.status, errText)
            return NextResponse.json({ error: 'La génération a échoué.' }, { status: 502 })
        }

        const data = await response.json()
        const toolCall = data.choices?.[0]?.message?.tool_calls?.[0]
        if (!toolCall) {
            console.error('Réponse sans tool_call:', JSON.stringify(data))
            return NextResponse.json({ error: 'Réponse IA invalide.' }, { status: 502 })
        }

        const generated = JSON.parse(toolCall.function.arguments)

        const content = {
            objectifs: objectifs ? objectifs.split('\n').filter(Boolean) : [],
            materiels,
            duree,
            methodes,
            champsObservation,
            documents: generated.documents ?? null,
            sources: (retrievedChunks ?? []).map((c: { document_title: string; chunk_text: string; source_url: string | null }) => ({
                titre: c.document_title,
                extrait: c.chunk_text.slice(0, 150) + '...',
                url: c.source_url,
            })),
            deroulement: generated.deroulement ?? [],
            activitesProlongement: generated.activitesProlongement ?? null,
        }

        const { data: fiche, error: insertError } = await supabase
            .from('fiches')
            .insert({
                teacher_id: user.id,
                title: titre,
                discipline,
                matiere: matiere ?? null,
                theme,
                level: niveau,
                content,
            })
            .select('id')
            .single()

        if (insertError) {
            console.error('Erreur insertion fiche:', insertError)
            return NextResponse.json({ error: 'Impossible d\'enregistrer la fiche.' }, { status: 500 })
        }

        return NextResponse.json({ id: fiche.id })
    } catch (error) {
        console.error('Erreur génération fiche:', error)
        return NextResponse.json({ error: 'Une erreur est survenue.' }, { status: 500 })
    }
}