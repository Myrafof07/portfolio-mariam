import { useFetch } from '../hooks/useFetch';
import { defaultSkills } from '../data/skills';
import { FaHtml5, FaCss3Alt, FaJs, FaReact, FaNode, FaDocker, FaGithub } from "react-icons/fa";
import { SiMongodb, SiFigma, SiSymfony } from "react-icons/si";

// Mapping de noms skills vers icones
const SKILL_ICONS = {
  'HTML / CSS': <FaHtml5 className="text-orange-500" />,
  'HTML': <FaHtml5 className="text-orange-500" />,
  'CSS': <FaCss3Alt className="text-blue-500" />,
  'JavaScript': <FaJs className="text-yellow-400" />,
  'React': <FaReact className="text-cyan-400" />,
  'Node.js': <FaNode className="text-green-500" />,
  'Node': <FaNode className="text-green-500" />,
  'MongoDB': <SiMongodb className="text-green-600" />,
  'Docker': <FaDocker className="text-sky-400" />,
  'Git / GitHub': <FaGithub className="text-white" />,
  'Git': <FaGithub className="text-white" />,
  'GitHub': <FaGithub className="text-white" />,
  'Figma': <SiFigma className="text-pink-500" />,
  'Symfony': <SiSymfony className="text-gray-200" />,
  'PHP / Symfony': <SiSymfony className="text-gray-200" />,
  'PHP': <SiSymfony className="text-gray-200" />,
};

function getIconForSkill(skillName) {
  return SKILL_ICONS[skillName] || <span className="text-lg">⚙️</span>;
}

function SkillBar({ skill }) {
  const percentage = skill.level || 0;
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-2xl">{getIconForSkill(skill.name)}</span>
          <span className="font-medium">{skill.name}</span>
        </div>
        <span className="text-xs px-2 py-1 rounded bg-indigo-600/30 text-indigo-200">
          {percentage}%
        </span>
      </div>
      <div className="w-full bg-slate-700 rounded-full h-2 overflow-hidden">
        <div
          className="bg-gradient-to-r from-indigo-500 to-purple-500 h-full rounded-full transition-all duration-500"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}

export default function Skills() {
  const { data: skillsData, isLoading, error } = useFetch('getSkills', defaultSkills);

  // Grouper les skills par catégorie
  const skillsByCategory = (skillsData || []).reduce((acc, skill) => {
    const category = skill.category || 'Autres';
    if (!acc[category]) acc[category] = [];
    acc[category].push(skill);
    return acc;
  }, {});

  const categories = Object.entries(skillsByCategory).map(([title, items]) => ({
    title,
    items
  }));

  return (
    <section id="skills" aria-labelledby="skills-title" className="py-16 bg-slate-900 text-white">
      <div className="mx-auto max-w-5xl px-6">
        <h2 id="skills-title" className="text-3xl md:text-4xl font-bold mb-8">
          Compétences
        </h2>
        
        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <div className="animate-pulse text-white/50">Chargement des compétences...</div>
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-6">
            {categories.map((cat) => (
              <div key={cat.title} className="rounded-xl border border-slate-700 bg-slate-800/60 p-5">
                <h3 className="text-xl font-semibold mb-5">{cat.title}</h3>
                <div className="space-y-4">
                  {cat.items.map((item) => (
                    <SkillBar key={item.id || item.name} skill={item} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {!isLoading && (!skillsData || skillsData.length === 0) && (
          <p className="text-center text-white/50">Aucune compétence trouvée.</p>
        )}

        <div className="mt-8 text-sm opacity-80">
          <p>
            Stack actuelle : React + Vite + Tailwind • Node/Express • MongoDB • PHP/Symfony • Figma • Git/GitHub
          </p>
        </div>
      </div>
    </section>
  );
}

