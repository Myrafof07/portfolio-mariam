
// server/controllers/adminController.js
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import User from '../models/Users.js';
import Project from '../models/Project.js';
import Skill from '../models/Skill.js';
import Contact from '../models/Contact.js';
import { logger } from '../utils/logger.js';

function ensureDB(req, res) {
  const ready = mongoose.connection?.readyState === 1;
  if (!ready) {
    res.status(503).json({ error: 'Base de données non disponible' });
  }
  return ready;
}

/**
 * POST /api/admin/login
 * Body: { email, password }
 * Retour: { token, user: { id, email, name, role } }
 */
export async function login(req, res, next) {
  try {
    if (!ensureDB(req, res)) return;

    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ error: 'Identifiants invalides' });

    const ok = await bcrypt.compare(password, user.passwordHash);
    if (!ok) return res.status(401).json({ error: 'Identifiants invalides' });

    user.lastLoginAt = new Date();
    await user.save();

    const token = jwt.sign(
      { id: user._id.toString(), email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
    );

    return res.json({
      token,
      user: { id: user._id, email: user.email, name: user.name, role: user.role }
    });
  } catch (err) {
    return next(err);
  }
}

/**
 * PROJECTS
 */
export async function listProjects(req, res, next) {
  try {
    if (!ensureDB(req, res)) return;
    const items = await Project.find().sort({ createdAt: -1 });
    res.json(items);
  } catch (err) {
    next(err);
  }
}

export async function createProject(req, res, next) {
  try {
    if (!ensureDB(req, res)) return;
    const { title, link, description, tags = [] } = req.body;
    const doc = await Project.create({ title, link, description, tags });
    res.status(201).json(doc);
  } catch (err) {
    next(err);
  }
}

export async function updateProject(req, res, next) {
  try {
    if (!ensureDB(req, res)) return;
    const { id } = req.params;
    const { title, link, description, tags } = req.body;
    const doc = await Project.findByIdAndUpdate(
      id,
      { $set: { title, link, description, tags } },
      { new: true, runValidators: true }
    );
    if (!doc) return res.status(404).json({ error: 'Projet introuvable' });
    res.json(doc);
  } catch (err) {
    next(err);
  }
}

export async function deleteProject(req, res, next) {
  try {
    if (!ensureDB(req, res)) return;
    const { id } = req.params;
    const doc = await Project.findByIdAndDelete(id);
    if (!doc) return res.status(404).json({ error: 'Projet introuvable' });
    res.json({ ok: true });
  } catch (err) {
    next(err);
  }
}

/**
 * SKILLS
 */
export async function listSkills(req, res, next) {
  try {
    if (!ensureDB(req, res)) return;
    const items = await Skill.find().sort({ createdAt: -1 });
    res.json(items);
  } catch (err) {
    next(err);
  }
}

export async function createSkill(req, res, next) {
  try {
    if (!ensureDB(req, res)) return;
    const { name, level = 50, category } = req.body;
    const doc = await Skill.create({ name, level, category });
    res.status(201).json(doc);
  } catch (err) {
    next(err);
  }
}

export async function updateSkill(req, res, next) {
  try {
    if (!ensureDB(req, res)) return;
    const { id } = req.params;
    const { name, level, category } = req.body;
    const doc = await Skill.findByIdAndUpdate(
      id,
      { $set: { name, level, category } },
      { new: true, runValidators: true }
    );
    if (!doc) return res.status(404).json({ error: 'Compétence introuvable' });
    res.json(doc);
  } catch (err) {
    next(err);
  }
}

export async function deleteSkill(req, res, next) {
  try {
    if (!ensureDB(req, res)) return;
    const { id } = req.params;
    const doc = await Skill.findByIdAndDelete(id);
    if (!doc) return res.status(404).json({ error: 'Compétence introuvable' });
    res.json({ ok: true });
  } catch (err) {
    next(err);
  }
}

/**
 * CONTACT MESSAGES (lecture)
 */
export async function listMessages(req, res, next) {
  try {
    if (!ensureDB(req, res)) return;
    const items = await Contact.find().sort({ createdAt: -1 });
    res.json(items);
  } catch (err) {
    next(err);
  }
}
