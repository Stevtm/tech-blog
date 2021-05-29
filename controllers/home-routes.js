const router = require("express").Router();
const sequelize = require("../config/connection");
const { User, Post, Comment } = require("../models");

// show login and signup page
router.get("/login", (req, res) => {
	res.render("login");
});

module.exports = router;
