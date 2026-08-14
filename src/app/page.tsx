import { createClient } from "@/utils/supabase/client"

export default async function Home() {
  const supabase = await createClient();
  
  const { data, error } = await supabase.from('document_chunks').select('*');

  console.log('data:', data)
  console.log('error:', error)

  return (
    <div>
      <p>Vérifie ton terminal</p>
    </div>
  )
}
