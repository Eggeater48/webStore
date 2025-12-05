const mongoose = require('mongoose')

// Ugly block that contains the dna of a product
// I do wonder if there is a way to make this look prettier
const productSchema = new mongoose.Schema({
	title: String,
	description: String,
	category: String,
	price: Number,
	discountPercentage: Number,
	rating: Number,
	stock: Number,
	tags: [],
	brand: String,
	sku: String,
	weight: Number,
	dimensions: {},
	warrantyInformation: String,
	shippingInformation: String,
	availabilityStatus: String,
	reviews: [],
	returnPolicy: String,
	minimumOrderQuantity: Number,
	meta: {
		createdAt: String,
		updatedAt: String,
		barcode: String,
		qrCode: String
	},
	images: [],
	thumbnail: String,
	purchaseCount: {
		type: Number,
		default: 0
	}
}, {
	timestamps: true
})

productSchema.set('toJSON', {
	transform: (document, returnedObject) => {
		returnedObject.id = returnedObject._id.toString()
		delete returnedObject._id
		delete returnedObject.__v
	}
})

module.exports = mongoose.model('Product', productSchema)