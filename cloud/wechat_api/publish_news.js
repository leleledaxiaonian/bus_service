var request=require('request');
var token=require('../accTok_updater.js');
var config =require('./API_constant.js');

//enable request debug
require('request-debug')(request);

base_url=config.URL.pushToUser;

function make_body(mediaid){

var json = { 
		"filter":{
     			 "is_to_all":true
   			},
		"mpnews":{
      		    "media_id": mediaid
  			 },
    		"msgtype":"mpnews"
  	  };
return json;
}

exports.publish = function( mediaid){
var access_token=token.get_token();
content_final=make_body(mediaid);	
console.log(content_final);
request(
    { method: 'POST'
    , url: base_url +'?access_token='+access_token 
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



function make_text(text){

var json = {
   		"touser":[
    			"oTVMlw26ZClRfL5IpTeM1-GCRTUY",
    			"oTVMlw6jB75FreoOvFCJQe6-Kc3o"
   			],
    			"msgtype": "text",
    		"text": { "content": text }
		};
return json;
}


exports.publish_text = function( text ){
var access_token=token.get_token();
var content_final=make_text(text);
var base_url=config.URL.pushToOpenId;
request(
    { method: 'POST'
    , url: base_url +'?access_token='+access_token 
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

//publish compond content to users by openid
function make_compond_body(mediaid){

var json = {
   		"touser":[
   			 "oTVMlw26ZClRfL5IpTeM1-GCRTUY",
    			 "oTVMlw6jB75FreoOvFCJQe6-Kc3o"
   			],
   			"mpnews":{
     				 "media_id": mediaid
   			},
    			"msgtype":"mpnews"
		};
return json;
}

exports.publish_by_oid = function( mediaid){
var access_token=token.get_token();
var content_final=make_compond_body(mediaid);	
var base_url=config.URL.pushToOpenId;
console.log(content_final);
request(
    { method: 'POST'
    , url: base_url +'?access_token='+access_token 
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


//publish template messages
function make_templ_body(title, content){

var json = {
           	"touser":"oTVMlw6jB75FreoOvFCJQe6-Kc3o",
           	"template_id":"1uPDiLvC-PTCRBFEjsus44Gfo2fDOTZBIFEmbiIcW7M",
           	"url":"http://weixin.qq.com/download",
           	"topcolor":"#FF0000",
           	"data":{
                   "title": {
                       "value":title,
                       "color":"#173177"
                   },
		   "price": {
                       "value":content,
                       "color":"#173177"
                   }
		}
	   };
return json;
}

exports.publish_tmpl_msg = function( title, content ){
var access_token=token.get_token();
var content_final=make_templ_body(title, content);	
var base_url=config.URL.sendTmpMsg;
console.log(content_final);
request(
    { method: 'POST'
    , url: base_url +'?access_token='+access_token 
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

