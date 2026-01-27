
import mongoose from 'mongoose';

export async function connectDB() {
  const uri = process.env.MONGODB_URI;

  if (!uri) {
    console.warn('ℹ️ MONGODB_URI non défini. Le stockage DB sera désactivé.');
    return;
  }

  try {
    await mongoose.connect(uri, {
      dbName: process.env.MONGODB_DB || undefined
    });
    console.log('✅ Connecté à MongoDB');
  } catch (err) {
    console.error('❌ Erreur de connexion MongoDB :', err.message);
    console.warn('ℹ️ L\'API continuera sans DB (contact non sauvegardé).');
  }
}
