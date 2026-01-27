
// server/models/User.js
import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true, maxlength: 120 },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true, index: true },
    passwordHash: { type: String, required: true },
    role: { type: String, enum: ['admin'], default: 'admin' },
    lastLoginAt: { type: Date }
  },
  { timestamps: true }
);

export default mongoose.models.User || mongoose.model('User', UserSchema);
