const admin = require('firebase-admin');
const serviceAccount = require('../data/serviceAccountKey.json');

// Initialize Firebase
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

// Exporting for external use
module.exports = db;
