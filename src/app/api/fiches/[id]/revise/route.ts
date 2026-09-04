import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import { canCreateFiche } from '@/utils/subscription'

const reviseFicheTool = {
    type: 'function',
    function: {
        name: 'revise_fiche',
        description:
            "Modifie une fiche pédagogique existante selon la demande de l'enseignant. N'inclus QUE les champs qui changent réellement suite à cette demande précise — laisse tous les autres de côté. Si le déroulement change, fournis le tableau complet mis à jour (pas seulement l'étape modifiée), car il remplace entièrement l'ancien.",
        parameters: {
            type: 'object',
            properties: {
                summary: {
                    type: 'string',
                    description: "Résumé très court (une phrase) de ce qui a été modifié, à afficher à l'enseignant.",
                },
                materiels: { type: 'string' },
                duree: { type: 'array', items: { type: 'string' } },
                methodes: { type: 'array', items: { type: 'string' } },
                champsObservation: { type: 'array', items: { type: 'string' } },
                documents: { type: 'string' },
                activitesProlongement: { type: 'string' },
                deroulement: {
                    type: 'array',
                    items: {
                        type: 'object',
                        properties: {
                            phase: { type: 'string' },
                            etape: { type: 'string' },
                            duree: { type: 'string' },
                            roleEnseignant: { type: 'string' },
                            activitesApprenant: { type: 'string' },
                            observations: { type: 'string' },
                        },
                        required: ['phase', 'etape', 'duree', 'roleEnseignant', 'activitesApprenant'],
                    },
                },
            },
            required: ['summary'],
        },
    },
}

export async function POST(request: Request, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params
    const cookieStore = await cookies()
    const supabase = createClient(cookieStore)

    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
        return NextResponse.json({ error: 'Non authentifié' }, { status: 401 })
    }
    const access = await canCreateFiche(supabase, user.id)
        if (!access.allowed) {
            return NextResponse.json(
                {
                    error: access.isSubscribed
                        ? `Limite de ${access.limit} actions atteinte pour ce mois. Votre quota se renouvelle avec votre prochain cycle d'abonnement.`
                        : 'Quota de fiches gratuites atteint. Un abonnement est nécessaire pour réviser vos fiches.',
                },
                { status: 403 }
            )
        }
    const { message } = await request.json()
    if (!message || typeof message !== 'string') {
        return NextResponse.json({ error: 'Message manquant' }, { status: 400 })
    }

    const { data: fiche } = await supabase
        .from('fiches')
        .select('content, chat_history, teacher_id')
        .eq('id', id)
        .single()

    if (!fiche || fiche.teacher_id !== user.id) {
        return NextResponse.json({ error: 'Fiche introuvable' }, { status: 404 })
    }

    const history = fiche.chat_history ?? []

    const conversation = [
        {
            role: 'system',
            content:
                "Tu modifies une fiche pédagogique existante à la demande d'un enseignant. Voici son contenu actuel au format JSON : " +
                JSON.stringify(fiche.content),
        },
        ...history.map((h: { role: string; content: string }) => ({ role: h.role, content: h.content })),
        { role: 'user', content: message },
    ]

    try {
        const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
                'Content-Type': 'application/json',
                'HTTP-Referer': `${process.env.NEXT_PUBLIC_SITE_URL}`,
                'X-Title': 'Fiches+',
            },
            body: JSON.stringify({
                model: 'anthropic/claude-haiku-4.5',
                messages: conversation,
                tools: [reviseFicheTool],
                tool_choice: { type: 'function', function: { name: 'revise_fiche' } },
            }),
        })

        if (!response.ok) {
            console.error('Erreur OpenRouter:', response.status, await response.text())
            return NextResponse.json({ error: 'La révision a échoué.' }, { status: 502 })
        }

        const data = await response.json()
        const toolCall = data.choices?.[0]?.message?.tool_calls?.[0]
        if (!toolCall) {
            return NextResponse.json({ error: 'Réponse IA invalide.' }, { status: 502 })
        }

        const { summary, ...changes } = JSON.parse(toolCall.function.arguments)

        const updatedContent = { ...fiche.content, ...changes }
        const updatedHistory = [
            ...history,
            { role: 'user', content: message },
            { role: 'assistant', content: summary },
        ]

        const { error: updateError } = await supabase
            .from('fiches')
            .update({ content: updatedContent, chat_history: updatedHistory })
            .eq('id', id)

        if (updateError) {
            console.error('Erreur mise à jour fiche:', updateError)
            return NextResponse.json({ error: 'Impossible de sauvegarder les modifications.' }, { status: 500 })
        }

        return NextResponse.json({ summary, content: updatedContent })
    } catch (error) {
        console.error('Erreur révision fiche:', error)
        return NextResponse.json({ error: 'Une erreur est survenue.' }, { status: 500 })
    }
}