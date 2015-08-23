var request=require('request');
var token=require('../accTok_updater.js');
var config =require('./API_constant.js');

//enable request debug
require('request-debug')(request);

base_url=config.URL.uploadnews;

function make_body(content){
var msgArray = [ content ];
var json = { 
	"articles": msgArray
  };
return json;
}

exports.upload = function( content){
var access_token=token.get_token();
content_final=make_body(content);	
console.log(content_final);
request(
    { method: 'POST'
    , url: 'https://api.weixin.qq.com/cgi-bin/media/uploadnews' +'?access_token='+access_token 
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
