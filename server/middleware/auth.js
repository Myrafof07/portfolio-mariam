
// server/middleware/auth.js
import jwt from 'jsonwebtoken';
import { logger } from '../utils/logger.js';

/**
 * Middleware d'authentification via JWT (Authorization: Bearer <token>)
 * - Vérifie la signature avec JWT_SECRET
 * - Attache req.user = { id, email, role }
 */
export function auth(req, res, next) {
  try {
    const header = req.headers.authorization || '';
    const [type, token] = header.split(' ');

    if (type !== 'Bearer' || !token) {
      return res.status(401).json({ error: 'Token manquant ou invalide' });
    }

    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { id: payload.id, email: payload.email, role: payload.role || 'admin' };
    return next();
  } catch (err) {
    logger.warn('Auth JWT invalide', { err });
    return res.status(401).json({ error: 'Non autorisé' });
  }
}

/**
 * Autorisation par rôle (ex: 'admin')
 */
export function requireRole(role = 'admin') {
  return (req, res, next) => {
    if (!req.user?.role || req.user.role !== role) {
      return res.status(403).json({ error: 'Accès interdit' });
    }
    return next();
  };
}
