var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
	user_name: { type: String},
	password: { type: String},
	create_at: { type: Date, default: Date.now }
}); 

mongoose.model('users', userSchema);