/**
 * Created by rakesh on 24/9/17.
 */
const  config=require('../config');
const  mongoose= require('mongoose');
mongoose.connect(config.db.mongo.url);
var db = mongoose.connection;
db.on('error', function () {
    throw new Error('unable to connect to database at ');
});
module.exports=mongoose;