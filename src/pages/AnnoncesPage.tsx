import { useEffect, useState } from "react"
import { supabase } from "../lib/supa"
import { Link } from "react-router-dom"

interface Annonce {
  id: string
  titre: string
  description: string
}

export default function AnnoncesPage() {
  const [annonces, setAnnonces] = useState<Annonce[]>([])

  useEffect(() => {
    supabase
      .from("annonces")
      .select("id, titre, description")
      .then(({ data }) => {
        if (data) setAnnonces(data)
      })
  }, [])

  return (
    <section className="sg-section">
      <div className="sg-container">
        <div className="sg-flex sg-items-center sg-justify-between">
          <h2 className="sg-title-h2">Annonces</h2>
          <Link to="/annonces/new" className="sg-btn-primary">
            Nouvelle annonce
          </Link>
        </div>
        <ul className="sg-mt-6 sg-grid sg-gap-4">
          {annonces.map((a) => (
            <li key={a.id} className="sg-card">
              <h3 className="sg-font-semibold">{a.titre}</h3>
              <p className="sg-text-black/80 sg-mt-2">{a.description}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
