/**
 * Created by rakesh on 29/9/17.
 */
const path = require('path');
const rootPath = path.normalize(__dirname);

var Stream = require('stream');
var readline = require('readline');
const fs = require('fs');

(function () {


var timer;

var filePath;
var rl;
var chatData={};

filePath=rootPath+'/public/chats';
fs.accessSync(filePath, fs.F_OK);
//logger.info('Opening file ' + filePath);
var instream = fs.createReadStream(filePath);
var outstream = new Stream();
rl = readline.createInterface(instream, outstream);

timer = new Date().getTime();
rl.on('close', function() {
    console.log("End of File!");
    //var elapsed = new Date().getTime() - timer;
    console.log(topN(3))

});
function topN(topCount) {
    var props = Object.keys(chatData).map(function(key) {
        return { Name: key, value: this[key] };
    }, chatData);
    props.sort(function(p1, p2) { return p2.value - p1.value; });
    return props.slice(0, topCount);

}
rl.on('line', function(line) {
    let userName= line.split(':')[0].replace(/[^A-Z0-9]+/ig, "");
    if(chatData.hasOwnProperty(userName)){
        chatData[userName]=chatData[userName]+1;
    }
    else{
        chatData[userName]=1;
    }
})
})()