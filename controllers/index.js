const router = require("express").Router();

const apiRoutes = require("./api");
const homeRoutes = require("./home-routes");
const dashboardRoutes = require("./dashboard-routes");

router.use("/api", apiRoutes);
router.use("/", homeRoutes);
router.use("/dashboard", homeRoutes);

// send 404 status if any routes other than the above are used
router.use((req, res) => {
	res.status(404).end;
});

module.exports = router;
