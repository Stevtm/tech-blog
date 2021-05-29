const { User } = require("../models");

const userData = [
	{
		username: "testuser1",
		password: "password",
	},
	{
		username: "testuser2",
		password: "password",
	},
];

const seedUsers = () => User.bulkCreate(userData);

module.exports = seedUsers;
