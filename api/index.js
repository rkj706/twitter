/**
 * Created by rakesh on 22/9/17.
 */
'use strict';
var express=require('express')
var router= express.Router();
var user=require('./user');
var follows=require('./follows');
var tweet=require('./tweet');

router.use('/tweet',tweet);
router.use('/user',user);
router.use('/follows',follows);


module.exports=router;