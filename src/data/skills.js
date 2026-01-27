/**
 * Données par défaut pour les compétences
 * Utilisées comme fallback si l'API n'est pas disponible
 */

export const defaultSkills = [
  // Frontend
  { id: 's1', name: 'HTML / CSS', level: 85, category: 'Frontend' },
  { id: 's2', name: 'JavaScript', level: 80, category: 'Frontend' },
  { id: 's3', name: 'React', level: 75, category: 'Frontend' },
  { id: 's4', name: 'Tailwind CSS', level: 80, category: 'Frontend' },
  { id: 's5', name: 'Vite', level: 70, category: 'Frontend' },
  { id: 's6', name: 'UX/UI (Figma)', level: 60, category: 'Frontend' },

  // Backend
  { id: 's7', name: 'Node.js', level: 70, category: 'Backend' },
  { id: 's8', name: 'Express.js', level: 70, category: 'Backend' },
  { id: 's9', name: 'MongoDB', level: 65, category: 'Backend' },
  { id: 's10', name: 'PHP / Symfony', level: 60, category: 'Backend' },
  { id: 's11', name: 'API REST', level: 75, category: 'Backend' },

  // Outils
  { id: 's12', name: 'Git / GitHub', level: 80, category: 'Outils' },
  { id: 's13', name: 'Docker', level: 55, category: 'Outils' },
  { id: 's14', name: 'Figma', level: 65, category: 'Outils' },
  { id: 's15', name: 'VS Code', level: 85, category: 'Outils' }
];

export default defaultSkills;
