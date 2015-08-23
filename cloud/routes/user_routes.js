var exp =require('express');
var router =exp.Router();
var bookingSess = require('../session_mgmt/booking_sess');


//send text to fan request
router.post('/bookings', function(req, res, next) {
console.log(req.body);

bookingSess.booking(req.body, function(result){
	
      if(result.error){
	res.send(result.reason);
	}
	else{
	res.send("预定成功");
	}
});


});

router.get('/bookings', function(req, res, next) {
console.log(req.body);

res.render('booking', {
          title: '预定'
        });
});


module.exports=router;
