const router = require("express").Router();
const sequelize = require("../config/connection");
const { User, Post, Comment } = require("../models");

// show all posts on the home page
router.get("/", (req, res) => {
	// find all posts in the database (not including the comments)
	Post.findAll({
		include: [
			{
				model: User,
				attributes: ["id", "username"],
			},
		],
	})
		.then((dbPostData) => {
			const posts = dbPostData.map((post) => post.get({ plain: true }));
			res.status(200).render("home", { posts });
		})
		.catch((err) => {
			console.log(err);
			res.status(500).json(err);
		});
});

// show login page
router.get("/login", (req, res) => {
	res.status(200).render("login");
});

// show signup page
router.get("/signup", (req, res) => {
	res.status(200).render("signup");
});

module.exports = router;
