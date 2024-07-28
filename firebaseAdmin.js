const admin = require('firebase-admin');
require('dotenv').config();

// Force usage of @grpc/grpc-js
const grpc = require('@grpc/grpc-js');
const { Firestore } = require('@google-cloud/firestore');

// Ensure GRPC environment variables are set
process.env.GRPC_VERBOSITY = 'DEBUG';
process.env.GRPC_TRACE = 'all';

admin.initializeApp({
  credential: admin.credential.cert({
    type: process.env.FIREBASE_TYPE,
    project_id: process.env.FIREBASE_PROJECT_ID,
    private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
    private_key: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
    client_email: process.env.FIREBASE_CLIENT_EMAIL,
    client_id: process.env.FIREBASE_CLIENT_ID,
    auth_uri: process.env.FIREBASE_AUTH_URI,
    token_uri: process.env.FIREBASE_TOKEN_URI,
    auth_provider_x509_cert_url: process.env.FIREBASE_AUTH_PROVIDER_CERT_URL,
    client_x509_cert_url: process.env.FIREBASE_CLIENT_CERT_URL
  }),
  // Initialize Firestore with @grpc/grpc-js
  firestore: new Firestore({ grpc })
});

const db = admin.firestore();

module.exports = db;
