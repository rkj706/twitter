/**
 * Created by rakesh on 28/9/17.
 */
/**
 * Created by rakesh on 28/9/17.
 */
/**
 * Created by rakesh on 25/5/17.
 */
'use strict';

var express = require('express');
var passport = require('passport');
require('../signup/passport')(passport);
var router = express.Router();
// router.use(flash());
router.post('/', passport.authenticate('local-signup'),
    function (req,res) {
        if(req.user.message){
            return  res.status(200).json({message:req.user.message});
        }

    }
);
module.exports = router;
