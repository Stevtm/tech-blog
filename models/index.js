const User = require("./User");
const Post = require("./Post");
const Comment = require("./Comment");

// create associations between users and posts

User.hasMany(Post, {
	foreignKey: "user_id",
});

Post.belongsTo(User, {
	foreignKey: "user_id",
});

// create association from comments to users and posts

Post.hasMany(Comment, {
	foreignKey: "post_id",
});

Comment.belongsTo(Post, {
	foreignKey: "post_id",
});

User.hasMany(Comment, {
	foreignKey: "user_id",
});

Comment.belongsTo(User, {
	foreignKey: "user_id",
});

module.exports = { User, Post, Comment };
