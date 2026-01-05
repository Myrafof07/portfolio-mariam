import { useEffect, useMemo, useState } from "react";
import { HiMenu, HiX } from "react-icons/hi";
import useScrollSpy from "./useScrollSpy";

const SECTIONS = [
  { id: "hero", label: "Accueil" },
  { id: "about", label: "À propos" },
  { id: "skills", label: "Compétences" },
  { id: "projects", label: "Projets" },
  { id: "contact", label: "Contact" },
];

export default function Navbar() {
  const NAV_HEIGHT = 64;
  const ids = useMemo(() => SECTIONS.map((s) => s.id), []);
  const activeId = useScrollSpy(ids, NAV_HEIGHT);
  const [open, setOpen] = useState(false);
  const [elevated, setElevated] = useState(false);

  useEffect(() => {
    const onScroll = () => setElevated(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNavClick = (id) => (e) => {
    e.preventDefault();
    setOpen(false);
    const el = document.getElementById(id);
    if (!el) return;
    const y = el.getBoundingClientRect().top + window.scrollY - NAV_HEIGHT + 1;
    window.scrollTo({ top: y, behavior: "smooth" });
    history.replaceState(null, "", `#${id}`);
  };

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition shadow ${
        elevated ? "backdrop-blur bg-slate-950/60 shadow-slate-900/40" : "bg-transparent"
      }`}
      style={{ height: NAV_HEIGHT }}
      aria-label="Barre de navigation principale"
    >
      <nav className="mx-auto max-w-6xl h-full px-4 flex items-center justify-between text-white">
        <a
          href="#hero"
          onClick={handleNavClick("hero")}
          className="font-bold tracking-wide hover:opacity-90"
        >
          Mariam F.
        </a>

        <ul className="hidden md:flex items-center gap-6">
          {SECTIONS.map((s) => (
            <li key={s.id}>
              <a
                href={`#${s.id}`}
                onClick={handleNavClick(s.id)}
                className={`px-2 py-1 rounded-md transition ${
                  activeId === s.id
                    ? "text-white bg-white/10"
                    : "text-white/80 hover:text-white"
                }`}
                aria-current={activeId === s.id ? "page" : undefined}
              >
                {s.label}
              </a>
            </li>
          ))}
          <li>
            <a
              href="/Mariam_Fofana_CV.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-lg transition shadow-sm"
            >
              Télécharger mon CV
            </a>
          </li>
        </ul>

        <button
          className="md:hidden p-2 rounded hover:bg-white/10"
          aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <HiX size={22} /> : <HiMenu size={22} />}
        </button>
      </nav>

      <div
        className={`md:hidden transition-[max-height,opacity] overflow-hidden ${
          open ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        } bg-slate-950/90 backdrop-blur text-white`}
      >
        <ul className="px-4 py-3 space-y-2">
          {SECTIONS.map((s) => (
            <li key={s.id}>
              <a
                href={`#${s.id}`}
                onClick={handleNavClick(s.id)}
                className={`block w-full px-2 py-2 rounded-md ${
                  activeId === s.id
                    ? "bg-white/10 text-white"
                    : "text-white/85 hover:bg-white/10"
                }`}
              >
                {s.label}
              </a>
            </li>
          ))}
          <li className="pt-2">
            <a
              href="/Mariam_Fofana_CV.pdf"
              className="inline-flex px-3 py-2 rounded-md bg-indigo-600 hover:bg-indigo-700"
              download
            >
              Télécharger le CV
            </a>
          </li>
        </ul>
      </div>
    </header>
  );
}
