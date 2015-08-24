var request=require('request');
var token=require('./accTok_updater.js');
var config =require('./API_constant.js');




exports.menuGet = function( cb ){
var access_token=token.get_token();	
var base_url=config.URL.menuGet;

request(
    { method: 'GET'
    , url: base_url +'?access_token='+access_token 
     
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
        cb(body);
      }
    }
)

}

//create wechat public user interface menu
exports.createMenu = function(menu_jsonStr, cb){
var access_token=token.get_token();
var base_url = config.URL.menuCreate;
request(
    { method: 'POST'
    , url: base_url +'?access_token='+access_token 
    , json: true 
    , body: menu_jsonStr 
     
    }
  , function (error, response, body) {
        if (error) {
    		console.log(error)
   		 return
 		 }	
      if(response.statusCode == 201){
        console.log('201 recevied')
	cb(body);
      } else {
        console.log('error: '+ response.statusCode)
        cb(body);
      }
    }
)



}
