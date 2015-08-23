var domain = require('domain');
var path = require('path');
var cloud = require('./cloud');
var express = require('express');
var xmlparser = require('express-xml-bodyparser');
var cookieParser = require('cookie-parser');
var xml2js = require('xml2js');
var weixin = require('./cloud/weixin.js');
//var utils = require('express/node_modules/connect/lib/utils');
var https = require('https');
var wechat  =require('wechat');
var token = require('./cloud/accTok_updater.js');
var bodyparser = require('body-parser');
var publish_news = require('./cloud/routes/publish_news.js');
var session = require('express-session');
var AV	= require('leanengine');
var user_routes = require('./cloud/routes/user_routes.js');
var busClient_routes =require('./cloud/routes/busClient_routes.js');


// 解析微信的 xml 数据
var xmlBodyParser = function (req, res, next) {
  if (req._body) return next();
  req.body = req.body || {};

  // ignore GET
  if ('GET' == req.method || 'HEAD' == req.method) return next();

  // check Content-Type
  if ('text/xml' != req.mime) return next();

  // flag as parsed
  req._body = true;

  // parse
  var buf = '';
  req.setEncoding('utf8');
  req.on('data', function(chunk){ buf += chunk;});
  req.on('end', function(){  
    xml2js.parseString(buf, function(err, json) {
      if (err) {
          err.status = 400;
          next(err);
      } else {
          req.body = json;
          next();
      }
    });
  });
};
var access_token = '';
var app = express();

// App 全局配置
app.set('views',path.join(__dirname, 'views'));   	// 设置模板目录
app.set('view engine', 'ejs');    	// 设置 template 引擎
//app.use(bodyparser);    		// 读取请求 body 的中间件
//app.use(xmlBodyParser);
app.use(express.static('public'));
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(xmlparser());
app.use(cloud);
app.use(session({secret: 'ssshhhhh'}));
token.run();   //run the token server


// 使用 Express 路由 API 服务 /hello 的 HTTP GET 请求
app.get('/hello', function(req, res) {
  res.render('hello', { message: 'Congrats, you just set up your app!' });
});


//weixin path
app.get('/weixin', function(req, res) {
  console.log('get weixin req:', req.query);
  weixin.exec(req.query, function(err, data) {
    if (err) {
      return res.send(err.code || 500, err.message);
    }
    return res.send(data);
  });
});

//good path
app.get('/good',function(req,res) {
	console.log("good request");

res.render('hello',{user: "hello world",title:"welcome"});
});




// 未处理异常捕获 middleware
 app.use(function(req, res, next) {
  var d = domain.create();
   d.add(req);
   d.add(res);
   d.on('error', function(err) {
    console.error('uncaughtException url=%s, msg=%s', req.url, err.stack || err.message || err);
     if(!res.finished) {
       res.statusCode = 500;
       res.setHeader('content-type', 'application/json; charset=UTF-8');
       res.end('uncaughtException');
     }
   });
   d.run(next);
 });




app.use('/edit',publish_news); 
app.use('/user',user_routes);
app.use('/location', busClient_routes);

//post weixin path
app.post('/weixin', function(req, res) {

//old way to get access token start
//https.get("https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=wxd5e3f9f30def82fb&secret=0b3971ed1cbcb549713fc1c8fd5c9198", function(res) {
//  console.log("Got response: " + res.statusCode);
//  console.log("access token: " + res.body );
	
//  res.on('data', function (chunk) {
//	var json=JSON.parse(chunk);
//	access_token=json.access_token;
//    console.log('BODY: ' + json.access_token);
//  });
//});
// old way to get access token end 
//
access_token=token.get_token();
weixin.createMenu("config/menu.json", access_token, function(){});


  console.log('post weixin req:', req.body);
  weixin.exec(req, function(err, data) {
    if (err) {
      return res.send(err.code || 500, err.message);
    }
   if(data){
    var builder = new xml2js.Builder();
    var xml = builder.buildObject(data);
    console.log('res:', data);
    res.set('Content-Type', 'text/xml');
    return res.send(xml);
   }else{
	res.sendStatus(200);
   }
  });
});
//



// 如果任何路由都没匹配到，则认为 404
 // 生成一个异常让后面的 err handler 捕获
 app.use(function(req, res, next) {
   var err = new Error('Not Found');
   err.status = 404;
   next(err);
 });

 // error handlers
 app.use(function(err, req, res, next) {
   console.log(err.stack || err.message || err);
   res.status(err.status || 500);
   res.send('error:' + err.message);
 });



// 最后，必须有这行代码来使 express 响应 HTTP 请求
module.exports = app;
