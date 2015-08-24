var query_12306=require('../trainInfo/query_12306.js');
var exp =require('express');
var router =exp.Router();




router.get('/query', function(req, res, next) {

	console.log("dsffffffffffffffffffffffffffffffffffffff");
	
	console.log(req.query.queryDate);
	console.log(req.query.from_station);
	console.log(req.query.to_station);
	query_12306.get_left(req.query.queryDate,req.query.from_station,req.query.to_station,function(json_o){

	 console.log(json_o);
		res.json(json_o);
	});

});

router.get('/', function(req, res, next) {

	console.log(req.body);

res.send("ok");
});

module.exports=router;
