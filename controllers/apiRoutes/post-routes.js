const router = require('express').Router();
const sequelize = require('../../config/connection.js');
//including user into the post routes so we can do JOIN's at some point
const { Post, User, Vote, Comment } = require('../../models');

//route to retrieve all posts in the database

router.get('/', (req, res) => {
  console.log(`
  
  `)
  console.log('\x1b[33m', 'client request for all posts by users', '\x1b[00m');
  Post.findAll(
    {
      //query config
      attributes: [
        'id', 
        'post_url', 
        'title', 
        'created_at',
        [
          sequelize.literal(
          '(SELECT COUNT(*) FROM vote WHERE post.id = vote.post_id)'
          ), 'vote_count'//property name of the select count value
        ]
      ],
      //show posts in descending order by timestamp
      order: [['created_at', 'DESC']],
      //JOIN 
      include: [
        {
          model: Comment,
          attributes: [
            'id', 
            'comment_text', 
            'post_id', 
            'user_id'
          ],
          include: {
            model: User,
            attributes: ['username']
          }
        }
      ]
    }
  )
  .then(dbPostData => {
    //console.log(dbPostData);
    res.json(dbPostData);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

//get-one single post
router.get('/:id', (req, res) => {
  console.log(`
  
  `)
  console.log('\x1b[33m', 'client request for all posts by a single user_id', '\x1b[00m');
  Post.findOne(
    {
      where: {
        id: req.params.id
      },
      attributes: [
        'id', 
        'post_url', 
        'title', 
        'created_at',
        [
          sequelize.literal(
            '(SELECT COUNT(*) FROM vote WHERE post.id = vote.post_id)'
          ), 'vote_count'
        ]
      ],
      include: [
        {
          model: User,
          attributes: ['username']
        }
      ]
    }
  )
  .then(dbPostData => {
    if (!dbPostData) {
      res.status(404).json(
        {
          message: 'No post found with this user id'
        }
      );
      return;
    } else {
      //console.log(dbPostData);
      res.json(dbPostData);
    }
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

//create a post, user_id who posted it included!
router.post('/', (req, res) => {
  // expects {title: 'title of post', post_url: 'http://someurl.com', user_id: 1}
  console.log(`
  
  `)
  console.log('\x1b[33m', 'client request for user to make a post', '\x1b[00m');
  Post.create(
    {
      title: req.body.title,
      post_url: req.body.post_url,
      user_id: req.body.user_id
    }
  )
  .then(dbPostData => {
    //console.log(dbPostData);
    res.json(dbPostData);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

//PUT upvote /api/posts/upvote
//user_id is who is voting and post_id is the post the user is voting on
// router.put('/upvote', (req, res) => {
//   console.log(`
  
//   `)
//   console.log('\x1b[33m', 'client request to update a post by casting an upvote by user_id and post_id', '\x1b[00m');
//   Vote.create({
//     user_id: req.body.user_id,
//     post_id: req.body.post_id
//   })
//     .then(dbPostData => res.json(dbPostData))
//     .catch(err => res.json(err));
// });

//PUT upvote /api/posts/upvote
//user_id is who is voting and post_id is the post the user is voting on
router.put('/upvote', (req, res) => {
  //custom static method created in models/Post.js
  Post.upvote(req.body, { Vote })
  .then(updatedPostData => {
    //console.log(updatedPostData);
    res.json(updatedPostData);
  })
  .catch(err => {
    console.log(err);
    res.status(400).json(err);
  });
});
router.put('/:id', (req, res) => {
  console.log(`
  
  `)
  console.log('\x1b[33m', 'client request to update a post title by id ', '\x1b[00m');
  Post.update(
    {
      title: req.body.title
    },
    {
      where: {
        id: req.params.id
      }
    }
  )
  .then(dbPostData => {
    if (dbPostData[0] === 0 || !dbPostData) {
      res.status(404).json(
        {
          message: `No post found with the id of ${req.params.id}`
        }
      );
      return;
    } else {
      //console.log(dbPostData);
      res.json(dbPostData);
    }
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});


//update a posts title

//delete a post by id
router.delete('/:id', (req, res) => {
  console.log(`
  
  `)
  console.log('\x1b[33m', 'client request to delete a post', '\x1b[00m');
  Post.destroy(
    {
      where: {
        id: req.params.id
      }
    }
  )
  .then(dbPostData => {
    if (!dbPostData) {
      res.status(404).json(
        {
          message: 'No post found with this id'
        }
      );
        return;
    } else {
      //console.log(dbPostData);
      res.json(dbPostData);
    }
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});



module.exports = router;

