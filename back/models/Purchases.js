const mongoose = require('mongoose');

const purchaseSchema = new mongoose.Schema({
	userId: mongoose.Schema.Types.ObjectId,
	purchaseHistory: [
		{
			totalPrice: Number,

			products: [
				{
					product: [
						{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }
					],
					quantity: Number
				}

			]
		}
	],
})

purchaseSchema.set('toJSON', {
	transform: (document, returnedObject) => {
		delete returnedObject._id
		delete returnedObject.__v
	}
})

const Purchase = mongoose.model('Purchase', purchaseSchema)

module.exports = Purchase