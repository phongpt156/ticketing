import 'express-async-errors';
import mongoose from 'mongoose';
import { app } from './app';

const start = async () => {
  console.log('Starting up...');

  if (!process.env.JWT_KEY) {
    throw new Error('JWT_KEY must be definded');
  }

  if (!process.env.MONGO_URI) {
    throw new Error('MONGO_URI must be definded');
  }

  try {
    await mongoose.connect(process.env.MONGO_URI);
  } catch (error) {
    console.log(error);
  }

  app.listen(3000, () => {
    console.log('Listening on port 3000!');
  });
};

start();
