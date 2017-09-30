/**
 * Created by rakesh on 29/9/17.
 */
'use strict';
let express=require('express');
let tweetController=require('./controller.tweet')
let router=express.Router();

router.post('/',tweetController.postTweet);
router.get('/:id',tweetController.getTweetByUserId);
router.get('/',tweetController.getDashboardTweet);

module.exports=router