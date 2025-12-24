const requireRole = (...allowedRoles) => {
  return (req, res, next) => {
    // 1️ Make sure user exists
    if (!req.user || !req.user.role) {
      return res.status(403).json({ error: "Access denied. No role assigned." });
    }

    // 2️ Check if user's role is in allowedRoles
    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ error: "Forbidden: Insufficient role" });
    }

    // 3️ All good
    next();
  };
};

export default requireRole;
