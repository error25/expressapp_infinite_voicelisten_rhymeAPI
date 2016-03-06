var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var morgan = require('morgan');
var expressLayouts = require('express-ejs-layouts');
var mongoose = require('mongoose');
var User = require('./models/user');
var router = require('./config/routes');
var session = require('client-sessions');


mongoose.connect('mongodb://localhost/bcrypt-sessions');

app.set("view engine", "ejs");
app.set("views", __dirname + "/views");

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(expressLayouts);

//configure sessions
app.use(session({
  cookieName: 'session',
  secret: 'ssssh its a secret',
  duration: 30 * 60 * 1000,
  activeDuration: 5 * 60 * 1000
}));

// customer middleware to check the user still exists.
app.use(function(req,res,next){
  if(req.session && req.session.user){
    // check the db for the user
    User.findById(req.session.user._id, function(err,user){
      if(user){
        req.session.user = user;
        res.locals.user = user; // allows us to access the current user in the views.
      } else {
        req.session.reset() // log out the user
        res.redirect(302, '/login');
      }
      return next();
    });
  }
  else {
    // nothing to do.
    next();
  }
});
app.use('/static', express.static(__dirname + '/public'));
app.use('/', router);

app.listen(8000);