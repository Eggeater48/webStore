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

		const totalSum = combined.reduce((n, {totalPrice}) => n + totalPrice, 0)

		const purchase = {
			purchaseSum: totalSum,
			products: combined
		}
		// I will have order!!
		const order = {
			user: [ request.params.id ],
			products: [
				...purchase.products
			]
		}


		/*user.purchaseHistory.push(purchase)

		user.totalSpent += user.purchaseHistory.reduce((n, {purchaseSum}) => n + purchaseSum, 0)
		user.totalPurchases += 1*/

		//await user.save()

		response.status(200).end()
	} catch (error) {
		next(error)
	}
})

// TODO rename this path to something else at some point
purchaseRouter.get('/spent', async (request, response, next) => {
	try {
		const users = await User.find({})
		const result = users.map((user) => {
			return {
				username: user.name,
				spent: user.totalSpent,
				purchaseCount: user.totalPurchases,
				purchasedItems: user.purchaseHistory
			}
		})

		response.status(200).json(result).end()
	} catch (error) {
		next(error)
	}
})

module.exports = purchaseRouter