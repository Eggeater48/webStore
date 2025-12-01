const mongoose = require('mongoose')

// Just the basic mold for user, like in sql ig
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
	wishlist: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Product'
		}
	],
	totalPurchases: {
		type: Number,
		default: 0
	},
	totalSpent: {
		type: Number,
		default: 0
	},
	orders: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Order"
		}
	],
	phoneNumber: String,
	birthday: Date,
	passwordHash: String,
	addressSettings: {
		country: String,
		address: String,
		stateProvince: String,
		city: String,
		zipCode: String,
	}
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