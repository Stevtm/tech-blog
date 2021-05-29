const router = require("express").Router();
const sequelize = require("../config/connection");
const { User, Post, Comment } = require("../models");

// show login page
router.get("/login", (req, res) => {
	res.render("login");
});

// show signup page
router.get("/signup", (req, res) => {
	res.render("signup");
});

module.exports = router;
