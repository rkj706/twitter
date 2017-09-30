/**
 * Created by rakesh on 24/9/17.
 */
'use strict';
var mongoose=require('../config/mongoDb');
var Schema=mongoose.Schema;


var tweetSchema=new Schema({
    userId:{type:Schema.Types.ObjectId,ref:'User',index:true},
    text:{type:String},
    privacy:{type:Number,enum:[0,1,2]}, // 0: public,1:friends,2:onlyMe
    created_at:{type: Date, default: Date.now},
});


var Tweet=mongoose.model('Tweet',tweetSchema);
module.exports=Tweet;
