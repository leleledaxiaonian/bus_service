


exports.createUser =function( user, db, cb){

	if( !validate(user)){


	}

	db.store(user);

}
