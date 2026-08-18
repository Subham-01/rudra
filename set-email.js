const mongoose = require('mongoose');
require('dotenv').config({ path: '.env.local' });

async function setAdminEmail() {
  await mongoose.connect(process.env.MONGODB_URI);
  const adminSchema = new mongoose.Schema({ email: String }, { strict: false });
  const Admin = mongoose.model('AdminUser', adminSchema);
  const result = await Admin.updateOne({}, { $set: { email: 'sksingh9636@gmail.com' } });
  console.log('Updated:', result);
  process.exit(0);
}

setAdminEmail();
