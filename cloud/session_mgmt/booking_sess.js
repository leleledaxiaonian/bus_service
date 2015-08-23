var AV =require('leanengine');
var sessions={};

var Booking = AV.Object.extend('Booking');

exports.stateMachine = function( content, session){


	if( session == 1 ){
		return "请选择出发地：1 北京 2 故城";
	}

	if( true){

	}

}
exports.ifsession = function( msg ){

	if( sessions[msg.xml.fromusername] ){
		return true;
	}
	return false;

} 

exports.startSession= function(msg){

	sessions[msg.xml.fromusername] = '1';

}
exports.setState = function(msg){

	if( sessions[msg.xml.fromusername]){
		if ( sessions[msg.xml.fromusername] == '1'){

			sessions[msg.xml.fromusername] = '2';
			return "请选择选择班次：";
		}else if( sessions[msg.xml.fromusername] == '2' ){

			sessions[msg.xml.fromusername] = '3';
			return "请选择出发日期";

		}
				

	}

		
	



}

//store booking info
function procBookingInfo( bookingObj ){

	var booking =new Booking();
	
	booking.set("bookingObj", bookingObj);
	booking.set("openId", bookingObj.openId);
		
	booking.save(null, {
 			 success: function(booking) {
    				console.log('new booking created');	// 注册成功，可以使用了.
  			},
 		 	error: function(booking, error) {

    				console.log("Error: " + error.code + " " + error.message);
  			}
	});

}

function booking( bookingInfo, cb){
	//check if legal user
	var query = new AV.Query(Follower);
	var result={};
	
	query.equalTo("openId",bookingInfo.openId);
	query.find({
		 success: function(results){
			//save booking
			
			if(results.length == 0){
			   result.error=true;
			    result.reason='no such user';
				cb(result);
			}else{
			  procBookingInfo( bookingInfo );	
			   result.error=false;
			
			cb(result);
			}		 
		 },
		 error: function(error){
			console.log("no user exist"+error.message);
			result.error=true;
			result.reason='no such user';
	         }
		}
	


	)

}
exports.booking=booking;
