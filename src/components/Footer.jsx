import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-black/40 text-gray-300 py-8 border-t border-gray-800">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-6">
          <p className="text-sm">
            © {new Date().getFullYear()} Mariam Fofana — Tous droits réservés
          </p>
          <nav className="flex gap-6 text-sm">
            <Link to="/legal" className="hover:text-white transition">Mentions légales</Link>
            <a href="/admin" className="hover:text-white transition">Admin</a>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition">
              GitHub
            </a>
          </nav>
        </div>
      </div>
    </footer>
  );
}
