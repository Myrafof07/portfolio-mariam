
// server/routes/admin.js
import { Router } from 'express';
import rateLimit from 'express-rate-limit';
import { body, param, validationResult } from 'express-validator';
import { auth, requireRole } from '../middleware/auth.js';
import {
  login,
  listProjects, createProject, updateProject, deleteProject,
  listSkills, createSkill, updateSkill, deleteSkill,
  listMessages
} from '../controllers/adminController.js';

const router = Router();

// --- Utils de validation ---
function handleValidation(req, res, next) {
  const errors = validationResult(req);
  if (errors.isEmpty()) return next();
  const details = errors.array().map(e => ({ field: e.path, message: e.msg }));
  return res.status(400).json({ error: 'Validation error', details });
}

// --- Rate limit login (5 / 10 min) ---
const loginLimiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  limit: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Trop de tentatives de login, réessayez plus tard.' }
});

// --- Auth public ---
router.post(
  '/login',
  loginLimiter,
  body('email').isEmail().withMessage('Email invalide').normalizeEmail(),
  body('password').isLength({ min: 6 }).withMessage('Mot de passe requis'),
  handleValidation,
  login
);

// --- Middleware auth/role pour la suite ---
router.use(auth, requireRole('admin'));

// --- Projects ---
router.get('/projects', listProjects);

router.post(
  '/projects',
  body('title').isLength({ min: 2 }).withMessage('Titre requis'),
  body('link').optional().isURL().withMessage('URL invalide'),
  body('description').optional().isLength({ max: 2000 }),
  body('tags').optional().isArray().withMessage('tags doit être un tableau'),
  handleValidation,
  createProject
);

router.patch(
  '/projects/:id',
  param('id').isMongoId().withMessage('ID projet invalide'),
  body('title').optional().isLength({ min: 2 }),
  body('link').optional().isURL(),
  body('description').optional().isLength({ max: 2000 }),
  body('tags').optional().isArray(),
  handleValidation,
  updateProject
);

router.delete(
  '/projects/:id',
  param('id').isMongoId().withMessage('ID projet invalide'),
  handleValidation,
  deleteProject
);

// --- Skills ---
router.get('/skills', listSkills);

router.post(
  '/skills',
  body('name').isLength({ min: 2 }).withMessage('Nom requis'),
  body('level').optional().isInt({ min: 0, max: 100 }).withMessage('Level 0..100'),
  body('category').optional().isLength({ max: 120 }),
  handleValidation,
  createSkill
);

router.patch(
  '/skills/:id',
  param('id').isMongoId().withMessage('ID skill invalide'),
  body('name').optional().isLength({ min: 2 }),
  body('level').optional().isInt({ min: 0, max: 100 }),
  body('category').optional().isLength({ max: 120 }),
  handleValidation,
  updateSkill
);

router.delete(
  '/skills/:id',
  param('id').isMongoId().withMessage('ID skill invalide'),
  handleValidation,
  deleteSkill
);

// --- Messages de contact ---
router.get('/messages', listMessages);

export default router;
