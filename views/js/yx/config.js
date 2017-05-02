(function() {
    // 配置
    var envir = 'online';
    var configMap = {
        test: {
            appkey: '14b26a4201bd10a410cda38c6a84f0f0',
            url:'https://apptest.netease.im'
        },
        pre:{
    		appkey: '45c6af3c98409b18a84451215d0bdd6e',
    		url:'http://preapp.netease.im:8184'
        },
        online: {
           appkey: 'd97c9c9648a7992fb53af36addd1183b',
           url:'https://app.netease.im'
        }
    };
    window.CONFIG = configMap[envir];
}())