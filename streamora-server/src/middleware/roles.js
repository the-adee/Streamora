// role-based gatekeepers
// keeps the route handlers clean — each middleware focuses on a single policy decision

export function requireOrganizer(req, res, next) {
  if (!req.user) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  if (req.user.role !== "organizer") {
    return res
      .status(403)
      .json({ error: "Forbidden: organizer role required" });
  }
  next();
}

export function allowAttendeeOrOrganizer(req, res, next) {
  if (!req.user) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  if (req.user.role !== "attendee" && req.user.role !== "organizer") {
    return res
      .status(403)
      .json({ error: "Forbidden: attendee or organizer required" });
  }
  next();
}

export default { requireOrganizer, allowAttendeeOrOrganizer };
