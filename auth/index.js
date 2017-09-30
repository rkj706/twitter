/**
 * Created by rakesh on 28/9/17.
 */
'use strict';

var express = require('express');
var router=express.Router();
router.use('/signup',require('../auth/signup'));
 router.use('/signin',require('../auth/signin'));
// router.post('/signin',passAuth.signin);

module.exports = router;
