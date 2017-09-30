/**
 * Created by rakesh on 24/9/17.
 */
'use strict';
var mongoose=require('../config/mongoDb');
var Schema=mongoose.Schema;
var     bcrypt   = require('bcrypt-nodejs');


var userSchema=new Schema({
firstName:String,
lastName:String,
email:{type:String,index:true},
password:String,
location:{type:String,default:'india'},
screenName:{type:String,index:true}
});
userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
}
// checking if password is valid
userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};

//TODO: can e improved by checking  database before generating
userSchema.methods.generateScreenName=function (name) {
        name = name.replace(/\s/g, '');
        var text = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

        for (var i = 0; i < 5; i++)
            text += possible.charAt(Math.floor(Math.random() * possible.length));

        return name+text;


}


var User=mongoose.model('User',userSchema);
module.exports=User;
