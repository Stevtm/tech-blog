const router = require("express").Router();
const sequelize = require("../config/connection");
const { User, Post, Comment } = require("../models");

// show all posts on the home page - /
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
			// serialize data
			const posts = dbPostData.map((post) => post.get({ plain: true }));

			// render page and pass serialized data
			res.status(200).render("home", { posts, loggedIn: req.session.loggedIn });
		})
		.catch((err) => {
			console.log(err);
			res.status(500).json(err);
		});
});

// show one post on the single post page - /post/:id
router.get("/post/:id", (req, res) => {
	Post.findOne({
		where: {
			id: req.params.id,
		},
		include: [
			{
				model: User,
				attributes: ["id", "username"],
			},
			{
				model: Comment,
				attributes: ["id", "comment_text", "createdAt"],
				include: {
					model: User,
					attributes: ["id", "username"],
				},
			},
		],
	})
		.then((dbPostData) => {
			// check if this post exists
			if (!dbPostData) {
				res.status(404).json({ message: "No post found this this id." });
			}

			// serialize data
			const post = dbPostData.get({ plain: true });

			// render page and pass serialized data
			res
				.status(200)
				.render("single-post", { post, loggedIn: req.session.loggedIn });
		})
		.catch((err) => {
			console.log(err);
			res.status(500).json(err);
		});
});

// show login page - /login
router.get("/login", (req, res) => {
	// if the user is already logged in, redirect to the home page
	if (req.session.loggedIn) {
		res.redirect("/");
		return;
	}

	// otherwise, render login page
	res.status(200).render("login");
});

// show signup page - /signup
router.get("/signup", (req, res) => {
	// if the user is already logged in, redirect to the home page
	if (req.session.loggedIn) {
		res.redirect("/");
		return;
	}

	// otherwise, render signup page
	res.status(200).render("signup");
});

module.exports = router;
