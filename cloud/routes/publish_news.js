//deals with browser request

var exp =require('express');
var push = require('../wechat_api/push_news');
var publishnews = require('../wechat_api/publish_news');
var fan = require('../wechat_api/fanManage.js');
//var WCUser =require('../user_mgmt/wechat_user.js');
var WCMenuApi = require('../wechat_api/menu.js');
var router =exp.Router();
var AV =require('leanengine');
var WCOpener =require('../content_mgmt/wechat_opener.js');

//get main management page
router.get('/', function(req, res, next) {

WCMenuApi.menuGet( function(result){

		res.render('uploadnews', {
                	title: 'TODO 列表',
			menu_jsonStr: result
        		}

		);


	});

	


});


//get fan list
router.get('/fan', function(req, res, next) {
fan.getFan(function(result){
console.log(result);
res.render('fan', {
          body: result
        });	
})

});
        
//show wechat follower list recorded locally

router.get('/follower/', function(req,res,next){
	//this part of code should understands the http protocol,but not the called function
	//here we give follower module what they want
	
	if(req.query.method){
		
		/*
		WCUser.handleReq( req.query.method, function( result){
			//here we construct the response
			if(result)
				res.render('followerList', {
        				result:result,
					title:'粉丝列表'
  				});
			console.log(result);
		})
		*/
	}
});


//send mutimedia content to fans
router.post('/broadcast', function(req, res,next){
console.log(req.body.mediaid);
publishnews.publish_by_oid(req.body.mediaid);

res.sendStatus(200);
});

//upload contents to wechat server
router.post('/', function(req, res, next) {
console.log(req.body);

push.upload(req.body);
res.sendStatus(200);
});

//send text to fan request
router.post('/text', function(req, res, next) {
console.log(req.body.txt_content);

publishnews.publish_text(req.body.txt_content);
res.sendStatus(200);
});

//send template msg to users
router.post('/temp_msg', function(req, res, next) {
console.log(req.body.msg_content);

publishnews.publish_tmpl_msg(req.body.title_content, req.body.msg_content);
res.sendStatus(200);
});

router.post('/menu_change', function(req, res, next){
	console.log(req.body.menu_json);
	WCMenuApi.createMenu(JSON.parse(req.body.menu_json),function(result){

		res.send(result);


	});

});

//save first-time following content
router.post('/opener_change', function(req, res, next){
	console.log(req.body.opener_content);
	WCOpener.updateOpener(req.body.opener_content,function(result){
		if(result.error == true){
		 res.send(result.reason);
		}else{
			res.send("success");
		}

	});

});
module.exports=router;
