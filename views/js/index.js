var check = require("./checkout.js")
$(function(){
    $(".search-teacher").on("click",function(){
        var uname = $(".stu-name").val();
        if(check.checkName(uname)){
            alert(1);
        }
    });
})