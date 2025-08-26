import { useState } from "react"
import { supabase } from "../lib/supa"
import { useNavigate } from "react-router-dom"
import { toast } from "react-hot-toast"
import { useAuth } from "../contexts/AuthContext"

export default function NewAnnoncePage() {
  const [titre, setTitre] = useState("")
  const [description, setDescription] = useState("")
  const navigate = useNavigate()
  const { user } = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!user) {
      toast.error("Vous devez être connecté pour publier")
      return
    }
    const { error } = await supabase.from("annonces").insert({ titre, description })
    if (error) {
      toast.error(error.message)
    } else {
      toast.success("Annonce publiée")
      navigate("/annonces")
    }
  }

  return (
    <section className="sg-section">
      <div className="sg-container sg-max-w-md">
        <h2 className="sg-title-h2 sg-mb-6">Nouvelle annonce</h2>
        <form onSubmit={handleSubmit} className="sg-flex sg-flex-col sg-gap-4">
          <input
            className="sg-w-full sg-rounded-lg sg-border sg-border-black/20 sg-px-4 sg-py-2"
            value={titre}
            onChange={(e) => setTitre(e.target.value)}
            placeholder="Titre"
            required
          />
          <textarea
            className="sg-w-full sg-rounded-lg sg-border sg-border-black/20 sg-px-4 sg-py-2"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description"
            required
          />
          <button type="submit" className="sg-btn-primary">
            Publier
          </button>
        </form>
      </div>
    </section>
  )
}
