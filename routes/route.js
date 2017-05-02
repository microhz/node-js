var user_route = require('./user.js');
var demo_route = require('./demo.js');
module.exports = function (app) {
    user_route(app);
    demo_route(app);
}