var http=require("http");
var request=require("request");

//key value from baidu open platform
var baidu_key="UuFpICzPCTyzmvtvPh4yDA9W";
var baidu_url="http://api.map.baidu.com/geocoder/v2/";
var format="json";

exports.getLocation= function( lat, lng, cb ){
var url=baidu_url+"?ak="+baidu_key+"&location="+lat+","+lng+"&output="+format+"&pois=1";

 request(url, function (error, response, body) {
  if (!error && response.statusCode == 200) {
    console.log(body);// show the body 
	var json_o=JSON.parse(body);
	console.log(json_o.result.formatted_address);
	cb(json_o.result.formatted_address);
  }
});
};

