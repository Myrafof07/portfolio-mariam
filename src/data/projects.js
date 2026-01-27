/**
 * Données par défaut pour les projets
 * Utilisées comme fallback si l'API n'est pas disponible
 */

export const defaultProjects = [
  {
    id: 'p1',
    title: 'Portfolio 3D',
    link: 'https://portfolio-mariam.vercel.app',
    description: 'Portfolio React + Vite + Tailwind, animations Framer Motion, 3D Three.js. Interface moderne avec sections dynamiques et formulaire de contact sécurisé.',
    tags: ['React', 'Vite', 'Tailwind', 'Three.js', 'Framer Motion']
  },
  {
    id: 'p2',
    title: 'API Node minimaliste',
    link: '#',
    description: 'API REST Express avec validation, sécurité, rate-limiting, JWT auth. Base de données MongoDB et Nodemailer pour emails.',
    tags: ['Node.js', 'Express', 'MongoDB', 'REST', 'JWT']
  },
  {
    id: 'p3',
    title: 'E-commerce Front',
    link: '#',
    description: 'Plateforme e-commerce avec panier, filtres produits, et checkout. Built with React et intégration API.',
    tags: ['React', 'E-commerce', 'CSS Grid', 'State Management']
  }
];

export default defaultProjects;
