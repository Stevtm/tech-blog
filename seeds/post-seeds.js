const { Post } = require("../models");

const sequelize = require("../config/connection");

const postData = [
	{
		title: "Test Post 1",
		post_text: "Wow this is such a cool post I'm glad I (User 1) made it",
		user_id: 1,
	},
	{
		title: "Test Post 2",
		post_text: "Wow this is such a cool post I'm glad I (User 1) made it",
		user_id: 1,
	},
	{
		title: "Test Post 3",
		post_text: "Wow this is such a cool post I'm glad I (User 2) made it",
		user_id: 2,
	},
];

const seedPosts = () => Post.bulkCreate(postData);

module.exports = seedPosts;
