const User = require('./User.js');
const Post = require('./Post.js');
const Vote = require('./Vote.js');
const Comment = require('./Comment.js');

//one user can have many posts...but only a post only has one user
User.hasMany(Post, 
  {
    foreignKey: 'user_id'
  }
);

User.belongsToMany(Post,
  {
    through: Vote,
    as: 'voted_posts',
    foreignKey: 'user_id'
  }
);

Post.belongsTo(User, 
  {
    foreignKey: 'user_id'
  }
);

Post.belongsToMany(User,
  {
    through: Vote,
    as: 'voted_posts',
    foreignKey: 'post_id'
  }
);

Vote.belongsTo(User, 
  {
    foreignKey: 'user_id'
  }
);
Vote.belongsTo(Post, 
  {
    foreignKey: 'post_id'
  }  
);

User.hasMany(Vote, 
  {
    foreignKey: 'user_id'
  }  
);
Post.hasMany(Vote, 
  {
    foreignKey: 'post_id'
  }  
);

Comment.belongsTo(User,
  {
    foreignKey: 'user_id',
    onDelete: 'cascade'
  }
);
Comment.belongsTo(Post, 
  {
    foreignKey: 'post_id',
    onDelete: 'cascade'
  }  
);
User.hasMany(Comment,
  {
    foreignKey: 'user_id',
    onDelete: 'cascade'
  }  
);
Post.hasMany(Comment,
  {
    foreignKey: 'post_id',
    onDelete: 'cascade'
  }  
);

//we dont have to specify Comment as a "through" table
//like for Vote. this is becuase we dont need to access
// Post through Comment; we just want to see the user's comment and which
// post it was for. Thus the query will be slightly different


module.exports = { User, Post, Vote, Comment };