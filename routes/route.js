var user_route = require('./user.js');
var demo_route = require('./demo.js');
var pop_route = require('./stu/pop.js');
module.exports = function (app) {
    user_route(app);
    demo_route(app);
    pop_route(app);
}