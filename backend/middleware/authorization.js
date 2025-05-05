const authorization =
  (...allowedRoles) =>
  (req, res, next) => {
    if (!req.user || !allowedRoles.includes(req.user.role.name)) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized",
      });
    }
    next();
  };

module.exports = authorization;
