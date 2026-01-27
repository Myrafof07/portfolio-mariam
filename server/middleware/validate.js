
import { body, validationResult } from 'express-validator';

export const validateContact = [
  body('name')
    .trim()
    .isLength({ min: 2, max: 80 })
    .withMessage('Le nom doit contenir entre 2 et 80 caractères.'),
  body('email')
    .isEmail()
    .withMessage('Email invalide.')
    .normalizeEmail(),
  body('message')
    .trim()
    .isLength({ min: 10, max: 2000 })
    .withMessage('Le message doit contenir entre 10 et 2000 caractères.'),
  body('consent')
    .toBoolean()
    .isBoolean()
    .custom(v => v === true)
    .withMessage('Le consentement est obligatoire.')
];

export function handleValidation(req, res, next) {
  const errors = validationResult(req);
  if (errors.isEmpty()) return next();

  const details = errors.array().map(e => ({ field: e.path, message: e.msg }));
  return res.status(400).json({ error: 'Validation error', details });
}
