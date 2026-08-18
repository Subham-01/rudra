const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

async function seed() {
  await mongoose.connect('mongodb://localhost:27017/rudraapp');
  const salt = await bcrypt.genSalt(10);
  const passwordHash = await bcrypt.hash('admin123', salt);
  const db = mongoose.connection.db;
  const adminCollection = db.collection('adminusers');
  const exists = await adminCollection.findOne({ username: 'admin' });
  if (!exists) {
    await adminCollection.insertOne({ username: 'admin', passwordHash });
    console.log('Admin created');
  } else {
    console.log('Admin exists');
  }
  process.exit(0);
}
seed();
