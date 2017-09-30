/**
 * Created by rakesh on 29/9/17.
 */
/**
 * Created by rakesh on 28/9/17.
 */
var mongoose=require("mongoose");
var Schema = mongoose.Schema;


var messageSchema=new Schema({
    senderUserId:{type:Schema.Types.ObjectId,ref:'User',index:true},
    receiverUserId:{type:Schema.Types.ObjectId,ref:'User',index:true},
    message:String,
    sent:{type: Date, default: Date.now}
});

var message=mongoose.model('message',messageSchema);
module.exports=follow;