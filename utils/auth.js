// middleware that checks if a user is logged in
// if they are not, they are redirected to the login page
const checkAuth = (req, res, next) => {
	if (!req.session.user_id) {
		res.redirect("/login");
	} else {
		next();
	}
};

module.exports = checkAuth;
