import { FaExternalLinkAlt, FaGithub } from "react-icons/fa";

const projects = [
  {
    title: "Questionnaire interactif UX/UI",
    subtitle: "Prototype Figma",
    description:
      "Conception d’un prototype de questionnaire avec hiérarchie visuelle, composants réutilisables, micro-interactions et navigation fluide.",
    tech: ["Figma", "UX/UI"],

  },
  {
    title: "API Films, Acteurs & Reviews",
    subtitle: "API REST (Node.js / Express / MongoDB)",
    description:
      "CRUD complet, recherches avancées et agrégations MongoDB. Organisation des routes, schémas Mongoose et validation.",
    tech: ["Node.js", "Express", "MongoDB", "REST"],
    
  },
  {
    title: "BookManager",
    subtitle: "Back-office (PHP / Symfony)",
    description:
      "Gestion de livres avec authentification, rôles, upload d’images et sécurisation des accès. Interface admin avec Bootstrap.",
    tech: ["PHP", "Symfony", "Bootstrap"],
   
  },
];

function ProjectCard({ p }) {
  return (
    <article className="rounded-2xl border border-slate-700 bg-slate-800/60 overflow-hidden">
      
      <div className="h-40 bg-gradient-to-br from-indigo-900 via-purple-900 to-blue-800 flex items-center justify-center">
        {p.image ? (
          <img
            src={p.image}
            alt={`Capture du projet ${p.title}`}
            className="h-full w-full object-cover"
          />
        ) : (
          <span className="text-sm text-white/80">Aperçu du projet</span>
        )}
      </div>

      
      <div className="p-6 text-white">
        <h3 className="text-xl font-bold">{p.title}</h3>
        <p className="text-sm opacity-80">{p.subtitle}</p>

        <p className="mt-3 text-sm leading-relaxed">{p.description}</p>

        
        <div className="mt-4 flex flex-wrap gap-2">
          {p.tech.map((t) => (
            <span
              key={t}
              className="text-xs px-2 py-1 rounded bg-indigo-600/30 text-indigo-200 border border-indigo-700/40"
            >
              {t}
            </span>
          ))}
        </div>

        
        <div className="mt-5 flex gap-3">
          {p.repo && (
            <a
              href={p.repo}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm opacity-90 hover:opacity-100"
            >
              <FaGithub />
              <span>Code</span>
            </a>
          )}
          {p.demo && (
            <a
              href={p.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm opacity-90 hover:opacity-100"
            >
              <FaExternalLinkAlt />
              <span>Demo</span>
            </a>
          )}
        </div>
      </div>
    </article>
  );
}

export default function Projects() {
  return (
    <section id="projects" aria-labelledby="projects-title" className="py-16 bg-slate-950 text-white">
      <div className="mx-auto max-w-6xl px-6">
        <h2 id="projects-title" className="text-3xl md:text-4xl font-bold mb-8">
          Projets
        </h2>

        <p className="opacity-80 mb-6">
          Une sélection de projets réalisés en front-end, back-end et UX/UI. Chaque carte décrit l’objectif, la
          stack et les liens vers le code et la démo quand disponibles.
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((p) => (
            <ProjectCard key={p.title} p={p} />
          ))}
        </div>

        
        <div className="mt-8 text-xs opacity-70">
          <p>
            Astuce : ajoute des captures dans <code>/public/images</code> et complète les champs <code>repo</code> / <code>demo</code> pour chaque projet.
          </p>
        </div>
      </div>
    </section>
  );
}
