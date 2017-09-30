/**
 * Created by rakesh on 28/9/17.
 */
const base_url="http://localhost:5000/auth";

function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}
function  signup() {

    const firstName=$("#sp_fName").val();
    const lastName=$("#sp_lName").val();
    const email=$("#sp_email").val();
    const pass=$("#sp_pass").val();
    const conf_pass=$("#sp_cn_pass").val();

    if(!(validateEmail(email))){
        console.log("Ss");
        $(".sp_error").css('display','block');
        $(".sp_error").html('* Email is Invalid');

        return false;
    }
    if(firstName==""||lastName=="" || pass.length>10||conf_pass>10){
        $(".sp_error").css('display','block');
        $(".sp_error").html("* First Name and Last Name  Can't be less than 5 or greater than 10 ");

        return false;
    }

    if(pass==""||conf_pass=="" || pass.length>10||conf_pass>10){
        $(".sp_error").css('display','block');
        $(".sp_error").html("* Password  Can't be less than 5 or greater than 10 ");

        return false;
    }
    if(pass!==conf_pass){
        $(".sp_error").css('display','block');
        $(".sp_error").html('* Password should match');

        return false;
    }
    else {
        $.ajax({
            url: base_url+'/signup',
            data:JSON.stringify({

                email: email,
                password: pass,
                firstName:firstName,
                lastName:lastName

            }),
            method: 'POST',
            dataType: 'json',
            contentType: "application/json",
            success: function (data) {
                    alert(data.message);
            }
        })
    }

}
function signin() {

    const email=$("#sn_email").val();
    const pass=$("#sn_pass").val();
    if(pass==""||email==""){
        $(".sp_error").css('display','block');
        $(".sp_error").html("* Email or password can't be empty");

        return false;
    }else{
        $.ajax({
            url: base_url+'/signin',
            data:JSON.stringify({

                email: email,
                password: pass

            }),
            method: 'POST',
            dataType: 'json',
            contentType: "application/json",
            success: function (data) {

               if(data.code && data.code=="200"){
                   location.href="/dashboard";

               }else{
                   alert(data.message);
                   return false;
               }

            },error:function (error) {
                alert(error.message)
            }
        })
    }


}