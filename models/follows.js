/**
 * Created by rakesh on 28/9/17.
 */
var mongoose=require("mongoose");
var Schema = mongoose.Schema;


var followSchema=new Schema({
    userId:{type:Schema.Types.ObjectId,ref:'User',index:true},
    followingIds:{type:[Schema.Types.ObjectId]},
});

var follow=mongoose.model('follow',followSchema);
module.exports=follow;