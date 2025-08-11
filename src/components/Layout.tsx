import { Link } from 'react-router-dom';
import type { ReactNode } from 'react';
import Container from './Container';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-white border-b">
        <Container>
          <div className="flex justify-between items-center py-4">
            <Link to="/" className="font-bold text-xl">Sharings</Link>
            <nav className="space-x-4 text-sm">
              <Link to="/recherche">Annonces</Link>
              <Link to="/login">Se connecter</Link>
            </nav>
          </div>
        </Container>
      </header>
      <main className="flex-1">
        <Container>{children}</Container>
      </main>
      <footer className="bg-gray-100 text-center py-4 text-sm">© {new Date().getFullYear()} Sharings</footer>
    </div>
  );
}
