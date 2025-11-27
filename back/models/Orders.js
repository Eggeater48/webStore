const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema({
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User"
	},
	products: [
		{
			productData: [
				{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }
			],
			quantity: Number,
			totalPrice: Number,
			purchaseDate: Date
		}
	],
	status: String
}, { timestamps: true })

orderSchema.set('toJSON', {
	transform: (document, returnedObject) =>  {
		returnedObject.id = returnedObject._id.toString()
		delete returnedObject._id
		delete returnedObject.__v
	}
})

const Order = mongoose.model('Order', orderSchema)

module.exports = Order