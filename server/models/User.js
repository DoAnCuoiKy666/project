const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

const User= new Schema({
	email:
		{
			type: String,
    		required: true 
    	},
	username:String,
	password:String,
	privatekey:String,
	publickey:String,
	address:String,
	kcoin_available_balances:Number,
	kcoin_actual_balance:Number,
	passwordReset : { type : String , select : false }
});

User.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', User);
