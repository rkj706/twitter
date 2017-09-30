/**
 * Created by rakesh on 29/9/17.
 */
let express=require('express');
let controller=require('./controller.follows')
let router=express.Router();

router.post('/',controller.followUnfollow);
module.exports=router