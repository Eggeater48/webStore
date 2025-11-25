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
				product: [ product.id ],
				totalPrice: lilP.price * product.quantity,
				quantity: product.quantity,
				purchaseDate: new Date()
			}
		})

		//const totalSum = combined.reduce((n, {totalPrice}) => n + totalPrice, 0)
		// This could be used here but i dont see the vision at the moment

		// I will have order!!!
		const result = await Order.findOneAndUpdate({ user: request.params.id }, { products: combined }, {
			new: true,
			upsert: true
		})

		response.status(200).end()
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



module.exports = purchaseRouter