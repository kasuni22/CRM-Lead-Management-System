import dotenv from 'dotenv';
import mongoose from 'mongoose';
import connectDB from './config/db.js';
import User from './models/User.js';

dotenv.config();

const adminCredentials = {
  name: 'Admin',
  email: 'admin@example.com',
  password: 'password123',
};

const seedAdmin = async () => {
  try {
    await connectDB();

    const existingUser = await User.findOne({ email: adminCredentials.email });
    if (existingUser) {
      console.log(`Admin user already exists: ${adminCredentials.email}`);
      return;
    }

    const adminUser = new User(adminCredentials);
    await adminUser.save();

    console.log(`Admin user created successfully: ${adminCredentials.email}`);
  } catch (error) {
    console.error('Failed to seed admin user:', error.message || error);
    process.exitCode = 1;
  } finally {
    if (mongoose.connection.readyState) {
      await mongoose.connection.close();
    }
    process.exit(process.exitCode || 0);
  }
};

seedAdmin();
