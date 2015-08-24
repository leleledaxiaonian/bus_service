var request=require('request');


//enable request debug
//require('request-debug')(request);



function query_leftTicket( date, departure, arrival, cb ){
var departure =departure;
var arrival   =arrival;
var date	=date;
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
	cb(json_o);
      }
    }
)

}	

exports.get_left=query_leftTicket;
//query_leftTicket("content");
