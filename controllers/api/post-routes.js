const router = require("express").Router();
const { User, Post, Comment } = require("../../models");

// GET all posts - /api/posts
router.get("/", (req, res) => {
	Post.findAll({
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
			res.status(200).json(dbPostData);
		})
		.catch((err) => {
			console.log(err);
			res.status(500).json(err);
		});
});

// GET one post - /api/posts/:id
router.get("/:id", (req, res) => {
	Post.findOne({
		where: {
			id: req.params.id,
		},
		include: [
			{
				model: User,
				attributes: ["id", "username"],
			},
		],
	})
		.then((dbPostData) => {
			if (!dbPostData) {
				res.status(404).json({ message: "No post found with this id." });
				return;
			}

			res.status(200).json(dbPostData);
		})
		.catch((err) => {
			console.log(err);
			res.status(500).json(err);
		});
});

// POST create new post - /api/posts
router.post("/", (req, res) => {
	Post.create(req.body)
		.then((dbPostData) => {
			res.status(200).json(dbPostData);
		})
		.catch((err) => {
			console.log(err);
			res.status(500).json(err);
		});
});

// PUT update post - /api/posts/:id
router.put("/:id", (req, res) => {
	Post.update(
		{
			title: req.body.title,
			post_text: req.body.post_text,
		},
		{
			where: {
				id: req.params.id,
			},
		}
	)
		.then((dbPostData) => {
			if (!dbPostData) {
				res.status(404).json({ message: "No post found with this id." });
				return;
			}

			res.status(200).json(dbPostData);
		})
		.catch((err) => {
			console.log(err);
			res.status(500).json(err);
		});
});

// DELETE post - /api/posts/:id
router.delete("/:id", (req, res) => {
	Post.destroy({
		where: {
			id: req.params.id,
		},
	})
		.then((dbPostData) => {
			if (!dbPostData) {
				res.status(404).json({ message: "No post found with this id." });
				return;
			}

			res.status(200).json(dbPostData);
		})
		.catch((err) => {
			console.log(err);
			res.status(500).json(err);
		});
});

module.exports = router;
