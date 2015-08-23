//this module update the access token at a certain interval

var request=require('request');
var config =require('./API_constant.js');


var appSecret=config.CONFIG.appSecret;
var appId=config.CONFIG.appId;
var access_token;
var expires_in=config.CONFIG.tokUpdateInterval;
var instance_cnt=0;

function get_accTok( ){

	var url=config.URL.getToken+"?grant_type=client_credential&appid="+appId+"&secret="+appSecret;

	request(url,function(error, response,body){
		if( !error && response.statusCode==200){
			console.log(body);
			var json_o=JSON.parse(body);
			expires_in=json_o.expires_in;
			access_token=json_o.access_token;
			console.log(access_token);
			console.log(expires_in);
		}
	}); 
}

function updater(){
	var runing =5;

  	if( runing >= 1 ){
		setTimeout(updater, expires_in*1000);
		console.log(expires_in*1000); 

	}

	get_accTok();
}

exports.get_token= function(){
 return access_token;
};


exports.run=function(){
instance_cnt++;
console.log("token server instance"+instance_cnt);
updater();
console.log("after updater");
};
