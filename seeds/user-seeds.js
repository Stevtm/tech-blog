const { User } = require("../models");

const userData = [
	{
		username: "testuser1",
		email: "testuser1@email.com",
		password: "password",
	},
	{
		username: "testuser2",
		email: "testuser2@email.com",
		password: "password",
	},
];

const seedUsers = () => User.bulkCreate(userData);

module.exports = seedUsers;
