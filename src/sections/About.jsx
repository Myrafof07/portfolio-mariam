export default function About() {
  return (
    <section
      id="about"
      aria-labelledby="about-title"
      className="py-16 bg-slate-900 text-white px-6"
    >
      <div className="mx-auto max-w-4xl">
        <h2 id="about-title" className="text-3xl md:text-4xl font-bold mb-6">
          À propos de moi
        </h2>

        
        <div className="space-y-4 text-slate-200 leading-relaxed">
          <p>
            Je suis Mariam, étudiante en développement web à Paris. Au cours de ma formation,
            j’ai réalisé plusieurs projets concrets en front‑end, back‑end et UX/UI, allant de la
            conception de prototypes interactifs à la création d’API et d’applications web complètes.
          </p>
          <p>
            Curieuse et motivée, j’aime apprendre de nouvelles technologies et améliorer
            continuellement mes compétences. Je souhaite évoluer dans le développement web et
            participer à des projets utiles et bien pensés.
          </p>
        </div>

        
        <div className="mt-8 grid sm:grid-cols-2 gap-4">
          <div className="rounded-lg border border-slate-700 bg-slate-800/60 p-4">
            <h3 className="font-semibold mb-2">Ce que j’utilise souvent</h3>
            <p className="text-sm opacity-85">
              React, Vite, Tailwind • Node/Express • MongoDB • PHP/Symfony • Git/GitHub
            </p>
          </div>
          <div className="rounded-lg border border-slate-700 bg-slate-800/60 p-4">
            <h3 className="font-semibold mb-2">Ce que je recherche</h3>
            <p className="text-sm opacity-85">
              Stage/mission en développement web (front/back), à Paris ou en remote.
            </p>
          </div>
        </div>

        
        <div className="mt-8 flex flex-wrap gap-3">
          <a
            href="#projects"
            className="bg-white/10 hover:bg-white/20 text-white px-5 py-3 rounded-lg transition border border-white/20"
          >
            Voir mes projets
          </a>
          
          <a
            href="/Mariam_Fofana_CV.pdf"
            download
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-3 rounded-lg transition"
          >
            Télécharger mon CV
          </a>

          
          <a
            href="mailto:mariam.fofana@example.com?subject=Contact%20portfolio"
            className="bg-slate-800 hover:bg-slate-700 text-white px-5 py-3 rounded-lg transition border border-slate-700"
          >
            Me contacter
          </a>
        </div>
      </div>
    </section>
  );
}

