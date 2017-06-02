var conf = require('../config/api');
module.exports = {
    getRemoteUrl: function () {
        var java_server = conf.java_server.host + ":" + conf.java_server.port;
        return java_server;
    }
}