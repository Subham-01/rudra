import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import readline from 'readline';

dotenv.config({ path: '.env.local' });
dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error('Please define the MONGODB_URI environment variable');
  process.exit(1);
}

const adminSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
  role: { type: String, default: 'admin' },
}, { timestamps: true });

const AdminUser = mongoose.models.AdminUser || mongoose.model('AdminUser', adminSchema);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const question = (query) => new Promise((resolve) => rl.question(query, resolve));

async function resetPassword() {
  try {
    console.log('Connecting to database...');
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB.\n');

    const adminUser = await AdminUser.findOne({});
    if (!adminUser) {
      console.error('No admin user found in the database. Please run the setup script instead.');
      process.exit(1);
    }

    console.log(`Found admin user: ${adminUser.username}`);
    const newPassword = await question('Enter new password (min 6 chars): ');

    if (newPassword.length < 6) {
      console.error('Password must be at least 6 characters.');
      process.exit(1);
    }

    const confirmPassword = await question('Confirm new password: ');

    if (newPassword !== confirmPassword) {
      console.error('Passwords do not match.');
      process.exit(1);
    }

    console.log('\nHashing new password...');
    const passwordHash = await bcrypt.hash(newPassword, 10);
    
    adminUser.passwordHash = passwordHash;
    await adminUser.save();

    console.log('Password reset successfully!');
    console.log(`You can now log in with username: ${adminUser.username}`);

  } catch (error) {
    console.error('Error resetting password:', error);
  } finally {
    await mongoose.connection.close();
    rl.close();
  }
}

resetPassword();
