
import { Router } from 'express';

const router = Router();

const mockProjects = [
  {
    id: 'p1',
    title: 'Portfolio 3D',
    link: 'https://portfolio-mariam.vercel.app',
    description: 'Portfolio React + Vite + Tailwind, animations Framer Motion, 3D Three.js',
    tags: ['React', 'Vite', 'Tailwind', 'Three.js']
  },
  {
    id: 'p2',
    title: 'API Node minimaliste',
    link: '#',
    description: 'API Express avec validation et sécurité de base',
    tags: ['Node', 'Express', 'REST']
  }
];

const mockSkills = [
  { id: 's1', name: 'JavaScript', level: 80, category: 'Frontend' },
  { id: 's2', name: 'React', level: 75, category: 'Frontend' },
  { id: 's3', name: 'Node.js', level: 65, category: 'Backend' },
  { id: 's4', name: 'Tailwind CSS', level: 70, category: 'UI' }
];

router.get('/projects', (req, res) => {
  res.json(mockProjects);
});

router.get('/skills', (req, res) => {
  res.json(mockSkills);
});

export default router;
