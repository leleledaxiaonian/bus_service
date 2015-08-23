
var AV=require('leanengine');

Opener =AV.Object.extend('Opener');


exports.updateOpener= function( opener_content, cb){

	var ret={};
	var query=new AV.Query(Opener);
	query.equalTo('already','there');
	query.find({
		success: function(results){
			if(results.length == 0){		//need create
				console.log("enter 0result");
				var opener =new Opener();
				opener.set("content", opener_content);
				opener.set('already','there');
				opener.save(null,{
					success: function(opener){
						ret.error=false;
						cb(ret);
					},
					error: function(opener, error){
						ret.error=true;
						console.log('error:'+error.message );
						cb(ret);
					}

				})		//end save

			}else{			//already there
				results[0].set("content",opener_content);
				results[0].save();
				ret.error=false;
				cb(ret);

			}
			
		},
		error: function(error){
			
			
			if(  error.code === AV.Error.OBJECT_NOT_FOUND){
	
				var opener =new Opener();
				opener.set("content", opener_content);
				opener.set('already','there');
				opener.save(null,{
					success: function(opener){
						ret.error=false;
						cb(ret);
					},
					error: function(opener, error){
						ret.error=true;
						console.log('error:'+error.message );
						cb(ret);
					}

				})		//end save



	
			}else{
				console.log("failed-------");
				ret.error=true;
				ret.reason=error.message;
				cb(ret);
			}

		}



	
	});

}

exports.getOpener = function(cb){

	var ret={};
	var query=new AV.Query(Opener);
	query.equalTo('already','there');
	query.find({ 
	
		success: function(results){
			console.log("wwwwwwwwwwwsuccess");
			if( results.length != 1){//error
				ret.error=true;
				ret.reason="not 1 result found";
				cb(ret);
			}else{
			    console.log(results[0].get('content'));
			    ret.error=false;
			    ret.content=results[0].get('content');
			    cb(ret);
			}	
		},
		error:function(error){
			console.log("eeeeeeeesuccess");
			ret.error=true;
			ret.reason="AV query failed";
			cb(ret);

		}



	})


}
