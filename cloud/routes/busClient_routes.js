var exp =require('express');
var router =exp.Router();

router.get('/', function(req, res, next) {
console.log('location get : '+JSON.stringify(req.query, null, 4));
res.sendStatus(200);


});

router.post('/', function(req, res, next) {
console.log('location post');


});


module.exports=router;
