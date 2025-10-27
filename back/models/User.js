const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
	username: {
		type: String,
		required: true,
		minLength: [3, 'The username is too short'],
		unique: true
	},
	name: {
		type: String,
		required: true
	},
	email: {
		type: String,
	}, 
	wishlist: {
		type: Array
	},
	passwordHash: String,
})

userSchema.set('toJSON', {
	transform: (document, returnedObject) => {
		returnedObject.id = returnedObject._id.toString()
		delete returnedObject._id
		delete returnedObject.__v
		delete returnedObject.passwordHash
	}
})

const User = mongoose.model('User', userSchema)

module.exports = User