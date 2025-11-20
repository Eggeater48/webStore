//const bcrypt = require('bcryptjs');
const purchaseRouter = require('express').Router()
const User = require('../models/User')
const Product = require('../models/Products')

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
				quantity: product.quantity
			}
		})

		const totalSum = combined.reduce((n, {totalPrice}) => n + totalPrice, 0)

		const purchase = {
			purchaseSum: totalSum,
			purchaseDate: new Date(),
			products: combined
		}

		const user = await User.findById(request.params.id)

		user.purchaseHistory.push(purchase)

		console.log(purchase)
		console.log(user.purchaseHistory)

		//await user.save()*/

		response.status(200)

	} catch (error) {
		next(error)
	}
})



module.exports = purchaseRouter