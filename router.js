/**
 * Created by rakesh on 22/9/17.
 */
'use strict';
var auth=require('./auth/auth.service');
var fs=require('fs');
var readline = require('readline');

module.exports = function (app, passport) {

    app.use('/auth',require('./auth'));
    app.use('/api',auth.verifyToken,require('./api'));
    app.use('/dashboard',auth.verifyToken,dashboard)
    app.use('/logout',logOut)
    app.use('/',landing);
    
};

function logOut(req,res) {
        req.logout();
        req.session.destroy(function (err) {
            res.clearCookie('token');
            res.redirect('/'); //Inside a callback… bulletproof!
        });
}
function dashboard(req,res) {
    if(req.user && req.cookies && req.cookies.token){
        res.render('dashboard',{userInfo:{screenName:req.user.screenName},layout:false});

    }else{
        res.render('/landing');
    }
}

function landing(req, res) {

    if(req.user && req.cookies && req.cookies.token){

      res.redirect('/dashboard');

    }else {
        res.render('landing');


    }

}
