var request=require('request');
var token=require('../accTok_updater.js');
var config =require('./API_constant.js');



//get fan list

exports.getFan = function( cb){
var access_token=token.get_token();
var base_url=config.URL.getFan;
var result;
request(
    { method: 'GET'
    , url: base_url+'?access_token='+access_token+'&next_openid='
     
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
	result= body;
	cb(result);
      }
    }
)

}	

//get follower detail info by openId
exports.getFollowerMore = function(openId, cb ){
	
var access_token=token.get_token();
var base_url=config.URL.getFollowerMore;
var result; 
request(
    { method: 'GET'
    , url: base_url+'?access_token='+access_token+'&openid='+openId+'&lang=zh_CN'
     
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
	result= body;
	cb(result);
      }
    }
)

}
