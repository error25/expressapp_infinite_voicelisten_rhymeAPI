var router = require('express').Router();
var sessionsController = require('../controllers/sessions');

// Authorize middleware
function authorize(req,res,next){
  if(!req.session.user) return res.redirect('/login');
  next();
}


router.get('/', function(req, res) {
  res.render('home');
});

// pass authorize argument as middleware.
router.get('/secret', authorize, function(req, res) {
  res.render('secret');
});

router.route('/login')
  .get(sessionsController.loginForm)
  .post(sessionsController.handleLogin);

router.route('/signup')
  .get(sessionsController.signupForm)
  .post(sessionsController.handleSignup);

router.route('/logout')
  .get(sessionsController.handleLogout);

module.exports = router;