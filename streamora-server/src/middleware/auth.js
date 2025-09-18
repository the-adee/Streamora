// middleware to verify firebase id token coming from the client
// attaches a normalized user object to req.user so downstream handlers can trust identity
// expects header: Authorization: Bearer <id_token>

import admin from "../firebaseAdmin.js";

export async function verifyFirebaseToken(req, res, next) {
  const authHeader = req.headers.authorization || "";
  if (!authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "No token provided" });
  }

  const idToken = authHeader.replace("Bearer ", "").trim();
  try {
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    // custom claims may hold role; fallback to attendee until explicitly set
    const role =
      decodedToken.role ||
      decodedToken.roleClaim ||
      decodedToken?.claims?.role ||
      "attendee";
    req.user = {
      uid: decodedToken.uid,
      email: decodedToken.email || null,
      role,
    };
    return next();
  } catch (error) {
    console.error("Token verification failed:", error.message);
    return res.status(401).json({ error: "Unauthorized" });
  }
}

export default verifyFirebaseToken;
