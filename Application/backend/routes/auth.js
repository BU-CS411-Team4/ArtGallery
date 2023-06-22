const router = require('express').Router();
const passport = require('passport');

// start the OAuth login process for Google
router.get('/google', passport.authenticate('google', {
  scope: ['profile'] // you can add more Google scopes according to your needs
}));

// handle the callback after Google has authenticated the user
router.get('/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  function(req, res) {
    // successful authentication, redirect to your app.
    res.redirect('http://localhost:4200');
  }
);

router.get('/logout', (req, res) => {
  req.logout(() => {
    res.redirect('http://localhost:4200');
  });
});

router.get('/check', (req, res) => {
  if (req.user) {
    return res.send({loggedIn: true, user: req.user});
  } else {
    console.log(req.user)
    return res.send({loggedIn: false});
  }
});

module.exports = router;
