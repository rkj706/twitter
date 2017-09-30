var jwt = require('jsonwebtoken');
var config = require('../config');

var moment = require('moment');
const User=require('../models/users');
// const AMQP = require('../lib/amqp');

/**
 * Returns a jwt token signed by the app secret
 */
function signToken(id) {
  return jwt.sign({_id: id}, config.JWTsecret, {expiresIn: '7d'});
}


/**
 * Set token cookie directly for oAuth strategies
 */
function setTokenCookie(req, res) {
      var token = signToken(req.user._id);
      res.cookie('token', token);
      res.status(200).json({code:200,message:"authenticated"})
}


const verifyToken = function (req, res, next) {
  if (!(req.cookies && req.cookies.token) && !req.header('Authorization')) {
    return res.status(401).json({message: 'Please make sure your request has an Authorization header'});
  }
  let token = req.cookies.token || req.header('Authorization').split(' ')[1];
  var payload = null;
  try {
    payload = jwt.decode(token, config.JWTsecret);
    User.findById(payload._id, function (err, user) {
      if (err) throw next(err);
      req.user = user;
      next();
    });
  }
  catch (err) {
    return res.status(401).json({message: err.message});
  }
  if (payload.exp <= moment().unix()) {
    return res.status(401).json({message: 'Token has expired'});
  }
};


const checkAuthentication = function (req, res, next) {

  if (req.isAuthenticated() && req.cookies && req.cookies.token) {
      next();
  } else {
    res.redirect("/");
  }
}

exports.verifyToken = verifyToken;
exports.signToken = signToken;
exports.setTokenCookie = setTokenCookie;
exports.checkAuthentication = checkAuthentication;
