import { Link } from "react-router-dom"

export default function StickyActions() {
  return (
    <div className="fixed inset-x-0 bottom-4 z-40 px-4 sm:hidden">
      <div className="mx-auto flex max-w-md gap-2 rounded-2xl border border-white/10 bg-black/60 p-2 backdrop-blur">
        <Link to="/register?role=salon" className="flex-1 btn-primary text-center">
          Je suis un Salon
        </Link>
        <Link to="/register?role=indep" className="flex-1 btn-ghost text-center">
          Indépendant
        </Link>
      </div>
    </div>
  )
}
