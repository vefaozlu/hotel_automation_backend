//  Check if user admin is logged in if not redirect to login page

export default function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }

  return res.redirect("/auth/login");
}
