// Middleware za proveru korisničke role
module.exports = function checkRole(roles = []) {
  if (typeof roles === 'string') {
    roles = [roles];
  }
  return (req, res, next) => {
    // Auth0 korisnički objekat se očekuje u req.user
    const user = req.user;
    if (!user || !user["https://officespace.example.com/roles"]) {
      return res.status(403).json({ error: 'Nedozvoljen pristup (nema role)' });
    }
    const userRole = user["https://officespace.example.com/roles"];
    if (!roles.includes(userRole)) {
      return res.status(403).json({ error: 'Nedozvoljen pristup (pogrešna rola)' });
    }
    next();
  };
};
