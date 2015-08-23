var SimpleDb = require('simple-node-db');


var db = new SimpleDb('database');


// a simple user model
var user = {
    id:'12345',
    name:'Sam Sammyson',
    email:'sam@sammyson.com',
    status:'active'
};

// key is created for the 'user' domain
var key = db.createDomainKey( 'user', user.id )

var callback = function(err, model) {
    if (err) throw err;
    
    assert model.dateCreated;
    assert model.lastUpdated === model.dateCreated;
    assert model.version === 0;
};

// model must have an 'id' attribute
db.insert( key, model, callback );
