const router = require("express").Router();
const { User, Post, Comment } = require("../../models");

// GET all users - /api/users
router.get("/", (req, res) => {
	User.findAll({})
		.then((dbUserData) => {
			res.status(200).json(dbUserData);
		})
		.catch((err) => {
			console.log(err);
			res.status(500).json(err);
		});
});

// GET one user by id - /api/users/:id
router.get("/:id", (req, res) => {
	User.findOne({
		where: {
			id: req.params.id,
		},
	})
		.then((dbUserData) => {
			if (!dbUserData) {
				res.status(404).json({ message: "No user found with this id." });
			}

			res.status(200).json(dbUserData);
		})
		.catch((err) => {
			console.log(err);
			res.status(500).json(err);
		});
});

// POST create a new user - /api/users
router.post("/", (req, res) => {
	User.create(req.body)
		.then((dbUserData) => {
			res.status(200).json(dbUserData);
		})
		.catch((err) => {
			console.log(err);
			res.status(500).json(err);
		});
});

// PUT update a user - /api/users/:id
router.put("/:id", (req, res) => {
	User.update(req.body, {
		individualHooks: true,
		where: {
			id: req.params.id,
		},
	})
		.then((dbUserData) => {
			if (!dbUserData) {
				res.status(404).json({ message: "No user found with this id." });
			}

			res.status(200).json(dbUserData);
		})
		.catch((err) => {
			console.log(err);
			res.status(500).json(err);
		});
});

// DELETE user = /api/users/:id
router.delete("/:id", (req, res) => {
	User.destroy({
		where: {
			id: req.params.id,
		},
	})
		.then((dbUserData) => {
			if (!dbUserData) {
				res.status(404).json({ message: "No user found with this id." });
			}

			res.status(200).json(dbUserData);
		})
		.catch((err) => {
			console.log(err);
			res.status(500).json(err);
		});
});

module.exports = router;
