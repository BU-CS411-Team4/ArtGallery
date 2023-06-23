const router = require('express').Router();
const passport = require('passport');

router.get("/", (req, res) => {
  res.redirect("http://localhost:4200/");
})

// start the OAuth login process for Google
router.get('/google', passport.authenticate('google', {
  scope: ['profile'] // you can add more Google scopes according to your needs
}));

// handle the callback after Google has authenticated the user
router.get('/google/callback',
  passport.authenticate('google',{ failureRedirect: '/api/auth/' }),
  function(req, res) {
    res.redirect('/api/auth/');
  }
);

router.get('/logout',(req, res, next) => {
  req.logout(function (err) {
    if (err) { return next(err); }
    req.session = null;
    res.status(200).json({ message: 'Logged out successfully' });
  });
});

router.get('/check', (req, res) => {
  if (req.user) {
    return res.send({loggedIn: true, user: req.user});
  } else {
    return res.send({loggedIn: false});
  }
});

module.exports = router;
