const router = require("express").Router();
const { User, Post, Comment } = require("../../models");

// GET all comments - /api/comments
router.get("/", (req, res) => {
	Comment.findAll({
		include: [
			{
				model: User,
				attributes: ["id", "username"],
			},
			{
				model: Post,
				attributes: ["id", "title", "post_text"],
			},
		],
	})
		.then((dbCommentData) => {
			res.status(200).json(dbCommentData);
		})
		.catch((err) => {
			console.log(err);
			res.status(500).json(err);
		});
});

// GET one comment - /api/comments/:id
router.get("/:id", (req, res) => {
	Comment.findOne({
		where: {
			id: req.params.id,
		},
		include: [
			{
				model: User,
				attributes: ["id", "username"],
			},
			{
				model: Post,
				attributes: ["id", "title", "post_text"],
			},
		],
	})
		.then((dbCommentData) => {
			if (!dbCommentData) {
				res.status(404).json({ message: "No comment found with that id." });
				return;
			}

			res.status(200).json(dbCommentData);
		})
		.catch((err) => {
			console.log(err);
			res.status(500).json(err);
		});
});

// POST create comment - /api/comments
router.post("/", (req, res) => {
	Comment.create({
		comment_text: req.body.comment_text,
		user_id: req.session.user_id,
		post_id: req.body.post_id,
	})
		.then((dbCommentData) => {
			res.status(200).json(dbCommentData);
		})
		.catch((err) => {
			console.log(err);
			res.status(400).json(err);
		});
});

// PUT update comment - /api/comments/:id
router.put("/:id", (req, res) => {
	Comment.update(req.body, {
		where: {
			id: req.params.id,
		},
	})
		.then((dbCommentData) => {
			if (!dbCommentData) {
				res.status(404).json({ message: "No comment found with this id." });
				return;
			}

			res.status(200).json(dbCommentData);
		})
		.catch((err) => {
			console.log(err);
			res.status(500).json(err);
		});
});

// DELETE comment - /api/comments/:id
router.delete("/:id", (req, res) => {
	Comment.destroy({
		where: {
			id: req.params.id,
		},
	})
		.then((dbCommentData) => {
			if (!dbCommentData) {
				res.status(404).json({ message: "No comment found with this id." });
				return;
			}

			res.status(200).json(dbCommentData);
		})
		.catch((err) => {
			console.log(err);
			res.status(500).json(err);
		});
});

module.exports = router;
