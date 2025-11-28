//const bcrypt = require('bcryptjs');
const purchaseRouter = require('express').Router()
const User = require('../models/User')
const Product = require('../models/Products')
const Order = require('../models/Orders')

purchaseRouter.post('/checkout/:id', async (request, response, next) => {
	try {
		const productIds = request.body.products.map(product => product.id)
		const products = await Product.find({ '_id': { $in: productIds } })

		const combined = request.body.products.map(product => {
			const lilP = products
				.find(p => p.id === product.id)

			return {
				productData: [ product.id ],
				totalPrice: lilP.price * product.quantity,
				quantity: product.quantity,
				purchaseDate: new Date()
			}
		})

		// I will have order!!! (Yes status will be hardcoded for now..)
		const result = await Order.findOneAndUpdate({ user: request.params.id }, { products: combined, status: "Processing" }, {
			new: true,
			upsert: true
		})

		const user = await User.findById(request.params.id)

		user.orders = user.orders.concat(result._id)
		await user.save()

		response.status(200).json(result).end()
	} catch (error) {
		next(error)
	}
})

purchaseRouter.get('/orders', async (request, response, next) => {
	try {
		const result = await Order
			.find({})
			.populate('user')
			.populate({
				path: 'products',
				populate: { path: 'product' }
			})

		response.status(200).json(result).end()
	} catch (error) {
		next(error)
	}
})

purchaseRouter.get('/orders/:id', async (request, response, next) => {
	try {
		const result = await Order
			.findById(request.params.id)
			.populate('user')
			.populate({
				path: 'products',
				populate: { path: 'product' }
			})

		response.status(200).json(result).end()
	} catch (error) {
		next(error)
	}
})

purchaseRouter.put('/orders/:id', async (request, response, next) => {
	try {
		const result = await Order.findByIdAndUpdate(request.params.id, request.body)
			.populate('user')
			.populate({
				path: 'products',
				populate: { path: 'product' }
			})

		response.status(200).json(result).end()
	} catch (error) {
		next(error)
	}
})

module.exports = purchaseRouter