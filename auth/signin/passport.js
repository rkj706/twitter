// config/passport.js

var LocalStrategy   = require('passport-local').Strategy;

// load up the user model
var User = require('../../models/users');

// expose this function to our app using module.exports
module.exports = function(passport) {

  // =========================================================================
  // passport session setup ==================================================
  // =========================================================================
  // required for persistent signup sessions
  // passport needs ability to serialize and unserialize users out of session

  // used to serialize the user for the session
  passport.serializeUser(function (user, done) {

      done(null, user.id);


  });

  // used to deserialize the user
  passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
      done(err, user);
    });
  });

// =========================================================================
// LOCAL LOGIN =============================================================
// =========================================================================
// we are using named strategies since we have one for login and one for signup
// by default, if there was no name, it would just be called 'local'

  passport.use('local-login', new LocalStrategy({
      // by default, local strategy uses username and password, we will override with email
      usernameField: 'email',
      passwordField: 'password',
      passReqToCallback: true // allows us to pass back the entire request to the callback
    },
    function (req, email, password, done) { // callback with email and password from our form

      // find a user whose email is the same as the forms email
      // we are checking to see if the user trying to login already exists
      User.findOne({'email': email}, function (err, user) {
        // if there are any errors, return the error before anything else
        if (err)
        {
          var user=new User();
          user.message="somthing went wrong,please try again.";
          user.status="500"
          return done(null, user);
        }

        // if no user is found, return the message
        if (!user){
          var user=new User();
          user.status="404"
          user.message="User Not Found";
          return done(null, user);
        }


        if (!user.validPassword(password))
        {
          user.status="401"
          user.message="Incorrect Password";
          return done(null, user);
        }




        // all is well, return successful user
        return done(null, user);
      });

    }));

}
