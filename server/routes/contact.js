
import { Router } from 'express';
import rateLimit from 'express-rate-limit';
import { validateContact, handleValidation } from '../middleware/validate.js';
import { handleContact } from '../controllers/contactController.js';

const router = Router();

// Limite: 5 requêtes / 10 minutes par IP
const contactLimiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  limit: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Trop de tentatives. Réessayez dans quelques minutes.' }
});

router.post('/', contactLimiter, validateContact, handleValidation, handleContact);

export default router;
