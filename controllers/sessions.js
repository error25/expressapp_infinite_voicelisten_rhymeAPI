var User = require('../models/user');

function loginForm(req, res) {
  res.render('sessions/login')
}

function handleLogin(req, res) {
  User.findOne({ email: req.body.email }, function(err, user) {
    if(err) return res.render('login', { error: err });
    if(!user || !user.validatePassword(req.body.password)){
      return res.render('sessions/login');
    }
    // add the user object to the session
    req.session.user = user;

    res.redirect(302, '/');
  });
}

function signupForm(req, res) {
  res.render('sessions/signup');
}

function handleSignup(req, res) {
  var user = new User(req.body.user);
  user.save(function(err, user) {
    if(err) {
      return res.render('sessions/signup');
    }
    res.redirect(302, '/');
  });
}

function handleLogout(req, res) {
  req.session.reset();
  res.redirect('/');
}

module.exports = {
  loginForm: loginForm,
  handleLogin: handleLogin,
  signupForm: signupForm,
  handleSignup: handleSignup,
  handleLogout: handleLogout
};