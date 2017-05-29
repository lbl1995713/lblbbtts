const mongoose = require('./db.js'),
      Schema = mongoose.Schema

const UserSchema = new Schema({
	userName: {type: String},
	password: {type: String},
	userage: {type: Number},
	loginDate: {type: Date}
})

module.exports = mongoose.model('User', UserSchema)