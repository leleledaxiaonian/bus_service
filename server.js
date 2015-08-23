var AV = require('leanengine');

var APP_ID =  process.env.LC_APP_ID ||'vivl0itq4ot9d4sf15xpof987c7d7hiu0zwzhm77m8cibx2y';
var APP_KEY =  process.env.LC_APP_KEY || 'uib6zea493bhk8e4fuu4uhvc0r4s4imfqe4byjm3k16yoq0o';
var MASTER_KEY = process.env.LC_APP_MASTER_KEY ||'5ao5kj19y3f7utdvpxllmeex57bp40hh8qvrr8m625y0zbs2';

AV.initialize(APP_ID, APP_KEY, MASTER_KEY);
// 如果不希望使用 masterKey 权限，可以将下面一行删除
AV.Cloud.useMasterKey();
AV.Promise._isPromisesAPlusCompliant = false;

var app = require('./app');

// 端口一定要从环境变量 `LC_APP_PORT` 中获取。
// LeanEngine 运行时会分配端口并赋值到该变量。
var PORT = parseInt(process.env.LC_APP_PORT || 3004);
app.listen(PORT, function () {
   console.log('Node app is running, port:', PORT);
});
