/**
 * Created by rakesh on 29/9/17.
 */
const mCookies = {
    getItem: function (sKey) {
        var reg = new RegExp('.*'+sKey+'=(.*);')
        var str=document.cookie || null;
        if(str){
            var res  = reg.exec(str);
            return res[1]|| null;
        }
    }, hasItem: function (sKey) {
        return (new RegExp("(?:^|;s*)" + encodeURIComponent(sKey).replace(/[-.+*]/g, "$&") + "s*=")).test(document.cookie);
    }
}