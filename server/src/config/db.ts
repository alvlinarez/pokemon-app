import mongoose from 'mongoose';
import env from './env';

export const connectionDB = async () => {
  try {
    await mongoose.connect(env.dbUri);
    console.log('MongoDB Connected!');
  } catch (e) {
    console.error('connectionDB connection failed', e);
    process.exit(1);
  }
};
