const router = require("express").Router();
const sequelize = require("../config/connection");
const { User, Post, Comment } = require("../models");

// GET all posts by the user - /dashboard
router.get("/", (req, res) => {
	res.render("dashboard");
});

module.exports = router;
