const router = require('express').Router();
const sequelize = require('../config/connection.js');
const { Post, User, Comment } = require('../models');

//protecting this route only allowing access to logged in users
//but if I just type /dashboard into the browser I can still 
// get to the page without even logging in. hmmm
// we need to validate with the request.session
router.get('/', (req, res) => {
  console.log(`
  `);
  console.log("\x1b[33m", "client request to get to the dashboard", "\x1b[00m");
  console.log(`
  `);
  //checking if the user requesting this page is logged in
  console.log(req.session);
  //if not logged in deny access
  if (!req.session.user_id) {
    res.status(401).json({error: 'Unauthorized access without logging in to your account'});
    //res.status(401).end();
    return;
  } else {
    res.render('dashboard', { loggedIn: true });
  }
});

module.exports = router;