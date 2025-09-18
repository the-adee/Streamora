// simple route to inspect current authenticated user + role
// helpful during early integration testing

import { Router } from "express";
import { verifyFirebaseToken } from "../middleware/auth.js";

const router = Router();

router.get("/", verifyFirebaseToken, (req, res) => {
  return res.status(200).json({
    auth: true,
    user: req.user,
  });
});

export default router;
