import { FaGithub, FaLinkedin } from "react-icons/fa";

export default function Hero() {
  return (
    <section
      id="hero"
      className="min-h-screen flex flex-col justify-center items-center text-white bg-gradient-to-br from-purple-800 via-indigo-900 to-blue-700 px-6"
      aria-labelledby="hero-title"
    >
      
      <h1 id="hero-title" className="text-5xl md:text-6xl font-extrabold mb-4 text-center">
        Mariam Fofana
      </h1>

      
      <p className="text-center text-lg md:text-xl max-w-2xl mb-6 opacity-95">
        Étudiante en informatique à Paris, passionnée par le développement web et l’UX/UI.
        J’aime concevoir des interfaces claires et développer des applications modernes
        (React, Tailwind, Node.js), tout en améliorant continuellement mes compétences.
      </p>

      
      <div className="flex flex-wrap gap-3 justify-center mb-8">
        <a
          href="#projects"
          className="bg-white/10 hover:bg-white/20 text-white px-5 py-3 rounded-lg transition shadow-sm border border-white/20"
        >
          Voir mes projets
        </a>

        <a
          href="/Mariam_Fofana_CV.pdf"
          download
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-lg transition shadow-sm"
        >
          Télécharger mon CV
        </a>
      </div>
      

     
      <div className="flex gap-4">
        <a
          href="https://github.com/Myrafof07"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Ouvrir mon GitHub"
          className="flex items-center gap-2 bg-gray-900/60 hover:bg-gray-900/80 px-4 py-2 rounded-lg transition"
        >
          <FaGithub size={20} />
          <span>GitHub</span>
        </a>

        <a
          href="https://linkedin.com/in/mariam-fofana-09b392369"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Ouvrir mon LinkedIn"
          className="flex items-center gap-2 bg-blue-700/70 hover:bg-blue-700 px-4 py-2 rounded-lg transition"
        >
          <FaLinkedin size={20} />
          <span>LinkedIn</span>
        </a>
      </div>
    </section>
  );
}
