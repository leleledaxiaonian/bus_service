var request=require('request');



var upload_url="https://api.weixin.qq.com/cgi-bin/media/uploadimg";


exports.get_upload_url= function( access_token){
var url=upload_url+"?access_token="+access_token;

};
