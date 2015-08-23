/*dealing with following and unfollowing event, and followerlist generation and more*/

var followerMgmt =require('../wechat_api/fanManage.js');
var AV =require('leanengine');

 Follower = AV.Object.extend("Follower");




//create a default user for this follower in the form of AVUser
function createAVUser( openId, pubAccountId, followerId, moreInfo){ // follower
	//default user name would be 000000
	var username=pubAccountId+'___'+openId;
	var password='000000';
	var user = new AV.User(); 

	user.set("username", username);
	user.set("password", password);
	user.set("followerId", followerId);
	user.set("wechatAccInfo", moreInfo);
		
	user.signUp(null, {
 			 success: function(user) {
    				console.log('AVuser created');	// 注册成功，可以使用了.
  			},
 		 	error: function(user, error) {
    			// 失败了
    				console.log("Error: " + error.code + " " + error.message);
  			}
	});


}





//create a follower record in the leancloud and also create a default user

function createAndSave( openId, pubAccoutId, createTime){

	var follower = new Follower();

	follower.set("openId",openId);
	follower.set("pubAccoutId", pubAccoutId);
	follower.set("createTime", createTime);
	follower.save(null, {
  		success: function(follower) {
			console.log('New object created with objectId: ' + follower.id);
			//get detailed info
			followerMgmt.getFollowerMore(openId,function(result){
				createAVUser( openId, pubAccoutId, follower.id, result);	
			console.log(result);
			});
			
  		},
		error: function(follower, error) {
			console.log('Failed to create new object, with error message: ' + error.message);
			//maybe do sync with wechat servercreateAVUser
  		}
	});

}


//delete follower from the leanengine storage and at the same time delete the user
function deleteFollower( openId, pubAccoutId ){

	var query= new AV.Query(Follower);
	query.equalTo("openId", openId );

	query.find({
  		success: function(results) {
    			console.log("Successfully retrieved " + results.length + " Follower.");
   				 // process the result
    				for (var i = 0; i < results.length; i++) {
      					var object = results[i];
					//first delete related user
					var queryUser =new AV.Query(AV.User);
					queryUser.equalTo("followerId", object.id);
					queryUser.find({
						success: function(results){
						    for(var j=0; j< results.length; j++){
							 var object=results[j];
								      console.log("user found "+object);
							  object.destroy({

								success: function(myObject) {
    									console.log("user destroy success");
  									},
  								error: function(myObject, error) {
    									console.log("destory user failed."+ error.message);
  									} 							
								})
						    } 

						},
						error: function(error){
							console.log("find user failed");
						},
					})

      					object.destroy({
  						success: function(myObject) {
    						console.log("destroy success");// 对象的实例已经被删除了.
  						},
  						error: function(myObject, error) {
    						console.log("destory failed.");
  						}
						});
    				}
  			},
  		error: function(error) {
    			console.log("Error: " + error.code + " " + error.message);
  			}


		})
}


exports.newFollower = createAndSave;
exports.unFollow =deleteFollower;
