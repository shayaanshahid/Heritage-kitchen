import connectDB from './mongodb';
import User from '../models/User';
import bcrypt from 'bcryptjs';

async function seedAdmin() {
  await connectDB();
  
  const adminEmail = 'admin@heritagekitchen.be';
  const existingAdmin = await User.findOne({ email: adminEmail });
  
  if (existingAdmin) {
    console.log('Admin already exists');
    return;
  }
  
  const hashedPassword = await bcrypt.hash('admin123', 10);
  
  await User.create({
    name: 'Admin',
    email: adminEmail,
    password: hashedPassword,
    role: 'ADMIN'
  });
  
  console.log('Admin created: admin@heritagekitchen.be / admin123');
}

seedAdmin().then(() => process.exit());
