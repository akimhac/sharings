export default function Footer() {
  return (
    <footer className="mt-16 border-t border-white/10">
      <div className="container-page flex flex-col items-center justify-between gap-3 py-8 text-sm text-white/60 sm:flex-row">
        <p>© {new Date().getFullYear()} Sharings</p>
        <nav className="flex gap-4">
          <a className="hover:underline" href="#features">Fonctionnalités</a>
          <a className="hover:underline" href="#how">Comment ça marche</a>
          <a className="hover:underline" href="/login">Se connecter</a>
        </nav>
      </div>
    </footer>
  )
}
