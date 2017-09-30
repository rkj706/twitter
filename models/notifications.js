/**
 * Created by rakesh on 29/9/17.
 */
/**
 * Created by rakesh on 29/9/17.
 */
/**
 * Created by rakesh on 28/9/17.
 */
var mongoose=require("mongoose");
var Schema = mongoose.Schema;


var notificationSchema=new Schema({
    notifierUserId:{type:Schema.Types.ObjectId,ref:'User',index:true},
    receiverUserId:{type:Schema.Types.ObjectId,ref:'User',index:true},
    notification:String,
    created_at:{type: Date, default: Date.now}
});

var notification=mongoose.model('notification',notificationSchema);
module.exports=notification;