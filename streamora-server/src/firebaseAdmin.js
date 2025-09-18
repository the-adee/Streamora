// this file bootstraps the firebase admin sdk for the backend
// keeps initialization centralized so we don't duplicate logic across middlewares/routes
// preference order:
// 1. SERVICE_ACCOUNT_JSON env (stringified JSON)
// 2. local serviceAccountKey.json file (dev only)
// 3. application default credentials (if deployed to GCP environment)

import admin from "firebase-admin";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let credentialsSource = "env:SERVICE_ACCOUNT_JSON";
let serviceAccountObj = null;

// attempt to read credentials from env first
if (process.env.SERVICE_ACCOUNT_JSON) {
  try {
    serviceAccountObj = JSON.parse(process.env.SERVICE_ACCOUNT_JSON);
  } catch (err) {
    console.error(
      "Failed to parse SERVICE_ACCOUNT_JSON env. Falling back to local file."
    );
    serviceAccountObj = null;
  }
}

// if not in env, try local file (dev convenience)
if (!serviceAccountObj) {
  credentialsSource = "file:serviceAccountKey.json";
  const localPath = path.join(__dirname, "serviceAccountKey.json");
  if (fs.existsSync(localPath)) {
    try {
      serviceAccountObj = JSON.parse(fs.readFileSync(localPath, "utf-8"));
    } catch (err) {
      console.error(
        "Could not read local serviceAccountKey.json. Attempting ADC."
      );
      serviceAccountObj = null;
    }
  }
}

// initialize firebase admin with the best available credential
if (!admin.apps.length) {
  if (serviceAccountObj) {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccountObj),
    });
    console.log(`[firebase-admin] initialized with ${credentialsSource}`);
  } else {
    // final fallback — application default credentials (only valid in deployed envs with proper IAM)
    admin.initializeApp({
      credential: admin.credential.applicationDefault(),
    });
    console.log(
      "[firebase-admin] initialized with application default credentials"
    );
  }
}

export default admin;
