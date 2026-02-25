// mass-delete-pinecone-vectors.js
// Node.js script to mass delete Pinecone vectors based on filters using latest Pinecone SDK

import { Pinecone } from '@pinecone-database/pinecone';
import dotenv from 'dotenv';
dotenv.config();

const PINECONE_API_KEY = process.env.PINECONE_API_KEY;
const PINECONE_DB_URL = process.env.PINECONE_DB_URL;

if (!PINECONE_API_KEY || !PINECONE_DB_URL) {
  console.error('Missing required environment variables.');
  process.exit(1);
}

async function main() {
  // Instantiate Pinecone client
  const pc = new Pinecone({ apiKey: PINECONE_API_KEY });

  // Target the index using host URL
  const index = pc.index({ host: PINECONE_DB_URL });

  // Example filter: delete vectors where metadata.repoId matches
  const filter = {
    repoId: 'ShadowSlayer03/PRISM--Pull-Request-Intelligence-Safety-and-Metrics', // Change as needed
  };

  console.log('Deleting vectors matching filter:', JSON.stringify(filter));

  try {
    // Correct way to delete by metadata filter in v7+ SDK
    await index.deleteMany({ filter });
    console.log('Mass deletion request successfully sent.');
  } catch (error) {
    console.error('Detailed error during mass deletion:', error);
  }

  console.log('Mass deletion complete.');
  console.log('Please verify deletion in Pinecone dashboard or via API.');
}

main().catch(err => {
  console.error('Error during mass deletion:', err);
});

// New helper: logScriptInfo
function logScriptInfo() {
  console.log('Pinecone mass delete script loaded. Date:', new Date().toISOString());
}
logScriptInfo();
