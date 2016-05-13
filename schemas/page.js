var mongoose = require('mongoose')

var PageSchema = new mongoose.Schema({
	page: String
})

PageSchema.pre('save', function(next){
	next()
})

PageSchema.static = {
	findById: function(id, cb){
		return this.findOne({_id: id}).exec(cb);
	}
}

module.exports = PageSchema