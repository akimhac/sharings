import { useEffect, useMemo, useState } from "react"
import { supabase } from "../lib/supa"
import { Link } from "react-router-dom"

interface Annonce {
  id: string
  titre: string
  description: string
  location?: string
}

export default function AnnoncesPage() {
  const [annonces, setAnnonces] = useState<Annonce[]>([])
  const [searchTerm, setSearchTerm] = useState("")

  useEffect(() => {
    supabase
      .from("annonces")
      .select("id, titre, description, location")
      .then(({ data }) => {
        if (data) setAnnonces(data)
      })
  }, [])

  const filtered = useMemo(() => {
    const term = searchTerm.toLowerCase()
    return annonces.filter((a) =>
      a.titre.toLowerCase().includes(term) || a.location?.toLowerCase().includes(term)
    )
  }, [annonces, searchTerm])

  const highlight = (text: string) => {
    if (!searchTerm) return text
    return text.replace(new RegExp(`(${searchTerm})`, "gi"), "<mark>$1</mark>")
  }

  return (
    <section className="sg-section">
      <div className="sg-container">
        <div className="sg-flex sg-items-center sg-justify-between">
          <h2 className="sg-title-h2">Annonces</h2>
          <Link to="/annonces/new" className="sg-btn-primary">
            Nouvelle annonce
          </Link>
        </div>

        <div className="sg-mt-4">
          <input
            type="text"
            placeholder="Rechercher par titre ou lieu…"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="sg-w-full sg-rounded-lg sg-border sg-border-black/20 sg-px-4 sg-py-2"
          />
        </div>

        <ul className="sg-mt-6 sg-grid sg-gap-4">
          {filtered.map((a) => (
            <li key={a.id} className="sg-card">
              <h3
                className="sg-font-semibold"
                dangerouslySetInnerHTML={{ __html: highlight(a.titre) }}
              />
              {a.location && (
                <p
                  className="sg-text-black/70 sg-mt-1"
                  dangerouslySetInnerHTML={{ __html: highlight(a.location) }}
                />
              )}
              <p className="sg-text-black/80 sg-mt-2">{a.description}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
