/**
 * Created by rakesh on 29/9/17.
 */
const base_url="http://localhost:5000/api";
function postTweet(){
    var tweettext=$("#twt-text").val();
    if(tweettext.length<1 || tweettext.length>140){
        alert("tweet can't be less than 0 more or than 140 character");
        return false;
    }
    $.ajax({
        url: base_url+'/tweet',
        data:JSON.stringify({

            text: tweettext,

        }),
        method: 'POST',
        dataType: 'json',
        contentType: "application/json",
        success: function (data) {
            alert(data.message);
        }
    })

}