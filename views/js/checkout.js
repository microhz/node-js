function checkName(uname,obj){
    var patrn = /^\s*[\u4e00-\u9fa5]{2,10}\s*$/;
    if(!(patrn.test(uname))){
        obj.html("姓名必须为2-10个中文字符");
        return false;
    }
    return true;
}
function checkProvince(provinceId){
    if(provinceId == undefined){
        return false;
    }
    return true;
}
function checkGrade(gradeId){
    if(gradeId == undefined){
        return false;
    }
    return true;
}
function checkSubject(subjectId){
    if(subjectId == undefined){
        return false;
    }
    return true;
}
function checkSex(sexId,obj){
    if(sexId == undefined){
        obj.html("请选择性别");
        return false;
    }
    return true;
}
function checkNature(natureId,obj){
    if(natureId == undefined){
       obj.html("请选择辅导性质");
       return false;
    }
    return true;
}