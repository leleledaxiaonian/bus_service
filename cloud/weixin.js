var crypto = require('crypto');
var config = require('./config/weixin.js');
//var debug = require('debug')('AV:weixin');
var https = require('https');
var fs = require('fs'); 
var baidu = require('./baidu.js');
var request = require('request');
var bookingsess = require('./session_mgmt/booking_sess');
var WCFollowerMgmt = require('./user_mgmt/WCFollower');
var WCOpener =require('./content_mgmt/wechat_opener.js');

exports.exec = function(req, cb) {

var params= req.body;
  if (params.signature) {
    checkSignature(params.signature, params.timestamp, params.nonce, params.echostr, cb);
  } else {
    receiveMessage(req, cb);
  }
};

// 验证签名
var checkSignature = function(signature, timestamp, nonce, echostr, cb) {
  var oriStr = [config.token, timestamp, nonce].sort().join('');
  var code = crypto.createHash('sha1').update(oriStr).digest('hex');
  //debug('code:', code)
  if (code == signature) {
    cb(null, echostr);
  } else {
    var err = new Error('Unauthorized');
    err.code = 401;
    cb(err);
  }
};

// 接收普通消息
var receiveMessage = function(req, cb) {
var msg=req.body;

	if (msg){

	console.log("msg received");
}else{
return;
}
var session_ret;
if (bookingsess.ifsession(msg)){
	
	session_ret=bookingsess.setState(msg);
	
}
	if(msg.xml.msgtype == "event" && msg.xml.event == "LOCATION")
{
 console.log("a location request");
 baidu.getLocation(msg.xml.latitude,msg.xml.longitude,function(location){
  var result = {
    xml: {
      ToUserName: msg.xml.fromusername[0],
      FromUserName: '' + msg.xml.tousername + '',
      CreateTime: new Date().getTime(),
      MsgType: 'text',
      Content: '你好，you are at 「' + location + '」。'
    }
  };
cb(null,null);
});
return;
}
	
//menu buttion click event

	if( msg.xml.msgtype == "event" && msg.xml.event == "CLICK" ){

		var result;
		console.log("a button click event");
		if( msg.xml.eventkey == "BUS_BOOKING")
		{
			var sess = req.session
			sess.bus_booking = '1';
			bookingsess.startSession(msg);
			result = {
    					xml: {
      						ToUserName: msg.xml.fromusername[0],
      						FromUserName: '' + msg.xml.tousername + '',
      						CreateTime: new Date().getTime(),
      						MsgType: 'text',
      						Content: '请选择出发城市 1 北京 2 故城：'
    					}
				     };
				
		cb(null, result);
		return;
		}
		 
		
	}

	if( msg.xml.msgtype == "event" && ( msg.xml.event == "subscribe" || msg.xml.event == "unsubscribe" ) ){//user follow and unfollow
		if( msg.xml.event == "subscribe" ){
	
			WCFollowerMgmt.newFollower( msg.xml.fromusername[0], msg.xml.tousername, msg.xml.createtime);
			//send greeting message
			
		   	WCOpener.getOpener(function(result){
			console.log(result.content);
			var result = {
    					xml: {
      					ToUserName: msg.xml.fromusername[0],
      					FromUserName: '' + msg.xml.tousername + '',
      					CreateTime: new Date().getTime(),
      					MsgType: 'text',
      					Content: result.content
    					}
  				   };
  				cb(null, result);
				;
				
			});
			return
		}
		
		if( msg.xml.event == "unsubscribe")
		WCFollowerMgmt.unFollow( msg.xml.fromusername[0], msg.xml.tousername );
	}
var booking_session;
if( req.session.bus_booking ){

	console.log("bus_booking not null");
	booking_sesion='in booking session';
}

  var result = {
    xml: {
      ToUserName: msg.xml.fromusername[0],
      FromUserName: '' + msg.xml.tousername + '',
      CreateTime: new Date().getTime(),
      MsgType: 'text',
      Content: '你好，你发的内容是「' + msg.xml.content + session_ret+'」。'
    }
  };
  cb(null, result);
};

exports.createMenu_old = function(menuconfig,access_token, cb) {
	
	var menu = fs.readFileSync(menuconfig);
	if(menu) {  
      		menu = JSON.parse(menu);  
    	} 
		var data=JSON.stringify(menu);
	var options = {
  		host: 'api.weixin.qq.com',
  		port: 443,
  		path: '/cgi-bin/menu/create?access_token='+access_token,
  		method: 'POST',
		 headers: {
         			 'Content-Length': data.length
      			}
		};
	var post_req = https.request(options, function(res) {
     		 res.setEncoding('utf8');
      		 res.on('data', function (chunk) {
          		console.log('Response: ' + chunk);
      			});
  			});

  		// post the data
  		post_req.write(data);
  		post_req.end();
};
function make_menu_body(){

	var json={  
      "button": [  
        {  
          "name": "大巴",  
          "sub_button": [  
            {  
              "type": "view",  
              "name": "预定大巴",  
              "url": "http://match.avosapps.com/user/bookings"
            },  
            {  
              "type": "click",  
              "name": "大巴线路",  
              "key": "V1002_BID_PROJECTS"
            },  
            {  
              "type": "click",  
              "name": "联系大巴",  
              "key": "V1003_RETURN_PLAN"  
            },  
            {  
              "type": "click",  
              "name": "大巴位置",  
              "key": "V1004_TRANS_DETAIL"  
            }
          ]  
        },  
        {  
          "type": "view",  
          "name": "拼车",  
          "url":"http://www.qq.com"
        },  
        {  
          "name": "火车信息",  
          "sub_button": [  
            {  
              "type": "view",  
              "name": "余票查询",  
              "url":"http://match.avosapps.com/hc.html"
            },  
            {  
              "type": "click",  
              "name": "出租车",  
              "key": "V1001_GOOD"  
            },  
            {  
              "type": "view",  
              "name": "火车班次",  
              "url":"http://www.qq.com"
            },  
            {  
              "type": "view",  
              "name": "关于",  
              "url":"http://www.qq.com"
            }  
          ]  
        }  
      ]  
};

return json;

}
exports.createMenu = function(menuconfig, access_token, cb){
var content_final = make_menu_body();
request(
    { method: 'POST'
    , url: 'https://api.weixin.qq.com/cgi-bin/menu/create' +'?access_token='+access_token 
    , json: true 
    , body: content_final 
     
    }
  , function (error, response, body) {
        if (error) {
    		console.log(error)
   		 return
 		 }	
      if(response.statusCode == 201){
        console.log('201 recevied')
      } else {
        console.log('error: '+ response.statusCode)
        console.log(body)
      }
    }
)



}
