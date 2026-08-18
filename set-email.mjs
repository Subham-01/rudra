import mongoose from 'mongoose';

const MONGODB_URI = 'mongodb://localhost:27017/rudraapp';

async function setAdminEmail() {
  await mongoose.connect(MONGODB_URI);
  const adminSchema = new mongoose.Schema({ email: String }, { strict: false });
  const Admin = mongoose.model('AdminUser', adminSchema);
  const result = await Admin.updateOne({}, { $set: { email: 'sksingh9636@gmail.com' } });
  console.log('Updated:', result);
  process.exit(0);
}

setAdminEmail();
