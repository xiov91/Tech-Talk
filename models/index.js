const User = require('./User');
const Post = require('./Post');
const Comment = require('./Comment');

// sequelize associations go here

//post has a relation to user
Post.belongsTo(User, {
  foreignKey: "user_id"
});

User.hasMany(Post, {
  foreignKey: "user_id"
});

//post has a relation to comment

Post.hasMany(Comment, {
  foreignKey: "post_id"
});

//comment has a relation to user

Comment.belongsTo(User, {
  foreignKey: "user_id"
});

// the correct relation code is up to you

// when an export is surrounded by curly brackets they are called named exports. In order to require them in another file you must require them using the specific exported name. It is not the same for default export nor exporting the entire file in one variable
module.exports = {
  User,
  Comment,
  Post
};