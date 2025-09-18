// routes related to events management
// includes: create (organizer only), get by id (attendee or organizer)

import { Router } from "express";
import { verifyFirebaseToken } from "../middleware/auth.js";
import {
  requireOrganizer,
  allowAttendeeOrOrganizer,
} from "../middleware/roles.js";

const router = Router();

// POST /api/events/create -> organizer only
router.post("/create", verifyFirebaseToken, requireOrganizer, (req, res) => {
  // for now we just echo a stub; persistence layer comes later
  return res.status(201).json({
    message: "event created (stub)",
    createdBy: req.user.uid,
    role: req.user.role,
  });
});

// GET /api/events/:id -> attendee or organizer
router.get(
  "/:id",
  verifyFirebaseToken,
  allowAttendeeOrOrganizer,
  (req, res) => {
    const { id } = req.params;
    // stub response — would normally fetch event detail
    return res.status(200).json({
      id,
      title: `Sample Event ${id}`,
      accessRole: req.user.role,
      viewer: req.user.uid,
    });
  }
);

export default router;
