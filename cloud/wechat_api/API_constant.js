var config = {};


config.CONFIG={};


//charles "f5054bb6962f8a4717210659aee3b16e"
config.CONFIG.appSecret ="f5054bb6962f8a4717210659aee3b16e";

//charles  "wxd5481f3a6561f394" 
config.CONFIG.appId	="wxd5481f3a6561f394";

//update interval in seconds
config.CONFIG.tokUpdateInterval = 7100;




config.URL={};

//get token

config.URL.getToken ="https://api.weixin.qq.com/cgi-bin/token";
//upload image request,
config.URL.uploadbase ="https://api.weixin.qq.com/cgi-bin/media/";
config.URL.uploadimg=config.URL.uploadbase+"uploadimg";
config.URL.uploadnews=config.URL.uploadbase+"uploadnews";


//message push to users
config.URL.pushToUser ="https://api.weixin.qq.com/cgi-bin/message/mass/sendall";
config.URL.pushToOpenId ="https://api.weixin.qq.com/cgi-bin/message/mass/send";

//user management
config.URL.getFan ="https://api.weixin.qq.com/cgi-bin/user/get";
config.URL.getFollowerMore="https://api.weixin.qq.com/cgi-bin/user/info";


//send template message
config.URL.sendTmpMsg ="https://api.weixin.qq.com/cgi-bin/message/template/send";

//menu
config.URL.menuGet ="https://api.weixin.qq.com/cgi-bin/menu/get";
config.URL.menuCreate=" https://api.weixin.qq.com/cgi-bin/menu/create";


module.exports = config;
