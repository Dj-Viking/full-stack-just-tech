const router = require('express').Router();
const { Comment } = require('../../models');

router.get('/', (req, res) => {
  Comment.findAll()
  .then(dbCommentData => res.json(dbCommentData))
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

router.post('/', (req, res) => {
  console.log(`
  
  `)
  console.log('\x1b[33m', 'client request for user to make an upvote on a post', '\x1b[00m');
  console.log(`
  
  `)
  console.log(req.session);
  console.log("\x1b[33m", "checking the value of req.session.user_id", "\x1b[00m");
  console.log(req.session.user_id);
  console.log(req.body);
  //check the current session if user is logged in
  if (req.session.user_id) {
    Comment.create(
      {
        // comment_text: req.body.comment_text,
        // //use id from the session
        // user_id: req.session.user_id,
        // post_id: req.body.post_id
        ...req.body, user_id: req.session.user_id
      }
    )
    .then(dbCommentData => {
     // console.log(dbCommentData);
      res.json(dbCommentData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({message: 'You must be logged in to do that.'});
    });
  } else if(!req.session.user_id || req.session.user_id === null) {
    res.status(400).json({message: "You must be logged into comment on a post."});
    return;
  }
});

router.delete('/:id', (req, res) => {
  Comment.destroy(
    {
      where: {
        id: req.params.id
      }
    }
  )
  .then(dbCommentData => {
    if (!dbCommentData) {
      res.status(404).json(
        {
          message: `no comment found with the id of ${req.params.id}`
        }
      );
      return;
    } else {
      //console.log(dbCommentData);
      res.json(dbCommentData);
    }
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

module.exports = router;