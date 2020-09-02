const withAuth = (req, res, next) => {
  // if (!req.session.user_id) {
  //   res.redirect('/login');
  // } else {
  //   next();
  // } 
  !req.session.user_id 
    ? res.redirect('/login') 
    : next(); 
};

module.exports = {
  withAuth
};

/**
 * this function will act as a nomral request callback function
 * checking for the existance of a session property
 * and using res.redirect() if it's not there. 
 * If req.session.user_d does exist, it will call next() which could
 * potentially be another middleware function or the final function
 * that will render the template
 */