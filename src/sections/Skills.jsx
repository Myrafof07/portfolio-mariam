
// src/data/Skills.jsx
import { FaHtml5, FaCss3Alt, FaJs, FaReact, FaNode, FaDocker, FaGithub } from "react-icons/fa";
import { SiMongodb, SiFigma, SiSymfony } from "react-icons/si";

const categories = [
  {
    title: "Front-end",
    items: [
      { name: "HTML / CSS", icon: <FaHtml5 className="text-orange-500" />, level: "À l’aise" },
      { name: "JavaScript", icon: <FaJs className="text-yellow-400" />, level: "À l’aise" },
      { name: "React", icon: <FaReact className="text-cyan-400" />, level: "À l’aise" },
      { name: "UX / UI (Figma)", icon: <SiFigma className="text-pink-500" />, level: "Débutant+" },
    ],
  },
  {
    title: "Back-end",
    items: [
      { name: "Node.js", icon: <FaNode className="text-green-500" />, level: "Débutant+" },
      { name: "PHP / Symfony", icon: <SiSymfony className="text-gray-200" />, level: "Débutant+" },
      { name: "MongoDB", icon: <SiMongodb className="text-green-600" />, level: "À l’aise+" },
      { name: "API REST", icon: <FaNode className="text-green-500" />, level: "Intermédiaire (design)" },
    ],
  },
  {
    title: "Outils",
    items: [
      { name: "Git / GitHub", icon: <FaGithub className="text-white" />, level: "À l’aise" },
      { name: "Docker", icon: <FaDocker className="text-sky-400" />, level: "Débutant" },
      { name: "Figma", icon: <SiFigma className="text-pink-500" />, level: "Intermédiaire (maquettes)" },
    ],
  },
];

export default function Skills() {
  return (
    <section id="skills" aria-labelledby="skills-title" className="py-16 bg-slate-900 text-white">
      <div className="mx-auto max-w-5xl px-6">
        <h2 id="skills-title" className="text-3xl md:text-4xl font-bold mb-8">
          Compétences
        </h2>

        <div className="grid md:grid-cols-3 gap-6">
          {categories.map((cat) => (
            <div key={cat.title} className="rounded-xl border border-slate-700 bg-slate-800/60 p-5">
              <h3 className="text-xl font-semibold mb-4">{cat.title}</h3>
              <ul className="space-y-3">
                {cat.items.map((item) => (
                  <li
                    key={item.name}
                    className="flex items-center justify-between rounded-lg bg-slate-900/60 px-4 py-3"
                  >
                    <div className="flex items-center gap-3">
                      <span aria-hidden="true" className="text-2xl">{item.icon}</span>
                      <span className="font-medium">{item.name}</span>
                    </div>
                    <span className="text-xs px-2 py-1 rounded bg-indigo-600/30 text-indigo-200">
                      {item.level}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-8 text-sm opacity-80">
          <p>
            Stack actuelle : React + Vite + Tailwind • Node/Express • MongoDB • PHP/Symfony • Figma • Git/GitHub
          </p>
        </div>
      </div>
    </section>
  );
}

