const router = require("express").Router();
const { User, Post, Comment } = require("../models");
const checkAuth = require("../utils/auth");

// GET all posts by the user - /dashboard
router.get("/", checkAuth, (req, res) => {
	// find all posts by the logged in user
	Post.findAll({
		where: {
			user_id: req.session.user_id,
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
			// serialize the post data
			const posts = dbPostData.map((post) => post.get({ plain: true }));

			// render the dashboard with the serialized data
			res
				.status(200)
				.render("dashboard", { posts, loggedIn: req.session.loggedIn });
		})
		.catch((err) => {
			console.log(err);
			res.status(500).json(err);
		});
});

// GET render create page (after clicking the button on the dashboard)
router.get("/create", checkAuth, (req, res) => {
	res.status(200).render("create-post", {
		loggedIn: req.session.loggedIn,
	});
});

// GET edit an existing post (after clicking on it)
router.get("/edit/:id", checkAuth, (req, res) => {
	// get post information for the post
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

			// check if the post does not belong to the user logged in
			// if it does not, redirect to the dashboard
			if (dbPostData.user_id !== req.session.user_id) {
				res.redirect("/dashboard");
			}

			// serialize data
			const post = dbPostData.get({ plain: true });

			// render page and pass serialized data
			res
				.status(200)
				.render("edit-post", { post, loggedIn: req.session.loggedIn });
		})
		.catch((err) => {
			console.log(err);
			res.status(500).json(err);
		});
});

module.exports = router;
