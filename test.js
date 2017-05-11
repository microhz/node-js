function test() {
    a();
    b();
}

function a() {
    console.log('a');
    setTimeout(function(){
        console.log('sleep out');
    },1000);
}

function b() {
    console.log('b');
}

// test();
var promise = require('Promise')
var q = require('q')

function d() {
    var deffered = q.defer();
    console.log('sleep ');
    for(var i = 0;i < 1000;i ++) {
        console.log(i);
    }
    console.log('gets up');
    return deffered.promise;
}
function c(){
    var deffered = q.defer();
    console.log('c');
    return deffered.promise;
}

function main() {
    // d().then(c());
    d();
    c();
}


main();
