
import mongoose from 'mongoose';

const SkillSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    level: { type: Number, min: 0, max: 100, default: 50 },
    category: { type: String, trim: true }
  },
  { timestamps: true }
);

export default mongoose.models.Skill || mongoose.model('Skill', SkillSchema);
