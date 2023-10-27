const User = require('./user');
const Post = require('./post');
const Comment = require('./comment');

Post.belongsTo(User, {
  foreignKey: 'user_id'
});

Post.hasMany(Comment, {
    foreignKey: `post_id`,
    onDelete: 'CASCADE'
})

Comment.belongsTo(User, {
    foreignKey: 'user_id'
})

module.exports = { User, Post, Comment };
