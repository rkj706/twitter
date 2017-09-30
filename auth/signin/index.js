/**
 * Created by rakesh on 28/9/17.
 */

'use strict';

var express = require('express');
var passport = require('passport');
var auth = require('../auth.service');
require('../signin/passport')(passport);
var router = express.Router();
router.post('/', passport.authenticate('local-login'),
    function (req, res) {
        let message=req.user.message || "";
        if(req.user.message){
            return  res.status(200).json({status:req.user.status,message:req.user.message});
        }else{
            auth.setTokenCookie(req,res)
        }

    }
);
module.exports = router;
