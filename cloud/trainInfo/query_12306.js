var request=require('request');


//enable request debug
//require('request-debug')(request);



function query_leftTicket( content ){
var departure ="DZP";
var arrival   ="BJP";
var date	="2015-08-25";
request(
    { method: 'GET'
    , url: 'https://kyfw.12306.cn/otn/lcxxcx/query?purpose_codes=ADULT&queryDate='+date+"&from_station="+departure+"&to_station="+arrival
    , strictSSL: false    
    }
  , function (error, response, body) {
        if (error) {
		console.log("error happend");
    		console.log(error)
   		 return
 	}	
      if(response.statusCode == 201){
        console.log('201 recevied')
      } else {
        console.log('error: '+ response.statusCode)
        var json_o=JSON.parse(body);
	console.log(json_o.data.datas.yp_info);
      }
    }
)

}	

query_leftTicket("content");
