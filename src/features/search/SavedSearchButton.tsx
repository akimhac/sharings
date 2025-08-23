import { supabase } from "../../lib/supa"

export default function SavedSearchButton({ query }: { query: any }) {
  async function save() {
    const user = (await supabase.auth.getUser()).data.user
    if (!user) return alert("Connectez-vous pour sauvegarder.")
    const { error } = await supabase.from("saved_searches").insert({ user_id: user.id, query })
    if (error) return alert(error.message)
    alert("Recherche sauvegardée ✅ (mock alerte en dev)")
    console.log("ALERTE DEV → envoyer un email si des résultats nouveaux correspondent.")
  }
  return <button onClick={save} className="btn-ghost">Créer une alerte</button>
}
