const { Comment } = require("../models");

const sequelize = require("../config/connection");

const commentData = [
	{
		comment_text: "I am a comment by User 1 on Test Post 1",
		user_id: 1,
		post_id: 1,
	},
	{
		comment_text: "I am a comment by User 1 on Test Post 2",
		user_id: 1,
		post_id: 2,
	},
	{
		comment_text: "I am a comment by User 2 on Test Post 1",
		user_id: 2,
		post_id: 1,
	},
	{
		comment_text: "I am a comment by User 2 on Test Post 3",
		user_id: 2,
		post_id: 3,
	},
];

const seedComments = () => Comment.bulkCreate(commentData);

module.exports = seedComments;
