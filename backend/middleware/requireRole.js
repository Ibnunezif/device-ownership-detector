const requireRole = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user || !req.user.roles_id) {
      return res.status(403).json({ error: "Access denied. No role assigned." });
    }

    if (!allowedRoles.includes(req.user.roles_id.role_name)) {
      return res.status(403).json({ error: "Forbidden: Insufficient role" });
    }

    next();
  };
};

export default requireRole;