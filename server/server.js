
import 'dotenv/config.js';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';
import mongoose from 'mongoose';
import adminRouter from './routes/admin.js';
import { connectDB } from './config/db.js';
import contactRouter from './routes/contact.js';
import publicRouter from './routes/publics.js'; // GET /projects, /skills
import { notFound, errorHandler } from './middleware/errorHandler.js';

const app = express();

// --- Sécurité et middlewares globaux ---
app.use(helmet());
app.use(express.json({ limit: '100kb' }));
app.use(express.urlencoded({ extended: false }));

// CORS (autorise uniquement ton front)
const allowedOrigins = (process.env.CLIENT_URL || '').split(',').map(s => s.trim()).filter(Boolean);
app.use(cors({
  origin: (origin, cb) => {
    if (!origin || allowedOrigins.length === 0 || allowedOrigins.includes(origin)) {
      return cb(null, true);
    }
    return cb(new Error('Origine non autorisée par CORS'), false);
  }
}));

// Logs HTTP
app.use(morgan(process.env.NODE_ENV === 'production' ? 'combined' : 'dev'));

// --- Connexion DB (optionnelle) ---
await connectDB(); // n'échoue pas si MONGODB_URI absent

// --- Rate-limit global léger (facultatif) ---
const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 200,
  standardHeaders: true,
  legacyHeaders: false
});
app.use(globalLimiter);

// --- Routes ---
app.get('/api/health', (req, res) => {
  res.json({ ok: true, env: process.env.NODE_ENV || 'development' });
});

app.use('/api', publicRouter);      // GET /api/projects, /api/skills
app.use('/api/contact', contactRouter); // POST /api/contact

// --- 404 et gestion d'erreurs ---
app.use('/api/admin', adminRouter); // routes admin protégées
app.use(notFound);
app.use(errorHandler);

// --- Start server ---
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`✅ Serveur démarré sur http://localhost:${PORT}`);
  console.log(`📢 Env: ${process.env.NODE_ENV || 'development'}`);
});
