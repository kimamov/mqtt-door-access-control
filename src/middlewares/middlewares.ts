// checkAuth middleware checks if the current requests is authenticated
export function checkAuth(req, res, next) {
  if (req.isAuthenticated()) return next();
  req.logout();
  req.session.destroy();
  next("request not authenticated");
}