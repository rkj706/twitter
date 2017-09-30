/**
 * Created by rakesh on 22/9/17.
 */
let express=require('express');
let controller=require('./controller.user')
let router=express.Router();

router.get('/',controller.getUser);
module.exports=router;