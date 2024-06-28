const access = (...roles) => {
  return (req, res, next) => {
      const userRole = req.role; // Assumed to be set from the decoded JWT in the auth middleware
      if (roles.includes(userRole)) {
          next();
      } else {
          res.status(403).json({ error: "Access forbidden - You do not have permission to access this endpoint" });
      }
  };
};

module.exports = { access };
