var mongoose  = require('mongoose');
var Schema    = mongoose.Schema;

var NewSchema = new Schema({
	title: { type: String},
	type: {type: String},
	title_page: {type: String},
	desc: { type: String},
	user_name: { type: String },
	create_at: { type: Date, default: Date.now }
});

mongoose.model('news', NewSchema);