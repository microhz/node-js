
module.exports.checkName = function (uname){
    var patrn = /^\s*[\u4e00-\u9fa5]{2,10}\s*$/;
    if(!(patrn.test(userName))){
        webToast("姓名必须为2-10个中文字符","middle",2000);
        $(".error-name").html("姓名必须为2-10个中文字符");
        return false;
    }
    return true;
}
module.exports.checkProvince = function (provinceId){
    if(provinceId == ""){
        webToast("请选择省份","middle",2000);
        return false;
    }
    return true;
}
module.exports.checkGrade = function (gradeId){
    if(gradeId == ""){
        webToast("请选择年级","middle",2000);
        return false;
    }
    return true;
}
module.exports.checkSubject = function (subjectId){
    if(subjectId == ""){
        webToast("请选择科目","middle",2000);
        return false;
    }
    return true;
}
module.exports.checkSex = function (sexId){
    if(sexId == ""){
        $(".error-sex").html("请选择性别");
        webToast("请选择性别","middle",2000);
        return false;
    }
    return true;
}
module.exports.checkNature = function (natureId){
    if(natureId == ""){
        $(".error-time").html("请选择辅导性质");
        webToast("请选择辅导性质","middle",2000);
        return false;
    }
    return true;
}