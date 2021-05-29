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
				return;
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

// POST login with a user - /api/users/login
router.post("/users/login", (req, res) => {
	// find a user that matches the username in the field
	User.findOne({
		where: {
			username: req.body.username,
		},
	}).then((dbUserData) => {
		// send 400 response if no user with this username exists
		if (!dbUserData) {
			res.status(400).json({ message: "No user found with this username." });
			return;
		}

		// if the username exists, verify that the password is correct
		const validPassword = dbUserData.checkPassword(req.body.password);

		// check if the password is valid
		if (!validPassword) {
			res.status(400).json({ message: "Incorrect password." });
			return;
		}

		// save variables to session
		req.session.save(() => {
			req.session.user_id = dbUserData.id;
			req.sessison.username = dbUserData.username;
			req.session.loggedIn = true;

			res.json({ user: dbUserData, message: "Successfully logged in." });
		});
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
				return;
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
				return;
			}

			res.status(200).json(dbUserData);
		})
		.catch((err) => {
			console.log(err);
			res.status(500).json(err);
		});
});

module.exports = router;
