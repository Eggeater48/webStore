const bcrypt = require('bcryptjs');
const purchaseRouter = require('express').Router()
const Purchase = require('../models/Purchases')
const User = require('../models/User')
const Product = require('../models/Products')

purchaseRouter.post('/checkout/:id', async (request, response, next) => {
	try {
		const user = await User.findById(request.params.id)
		const productIds = request.body.products.map(product => product.id)
		const products = await Product.find({ '_id': { $in: productIds } })

		const combined = request.body.products.map(product => {
			const lilP = products
				.find(p => p.id === product.id)

			return {
				id: product.id,
				totalPrice: lilP.price * product.quantity,
				quantity: product.quantity
			}
		})

		const theCreature = {
			userId: user.id,
			purchaseHistory: [
				{
					totalPrice: 3,
					purchaseDate: new Date(),
					products: request.body
				}
			]
		}

		console.log(theCreature)
		console.log(theCreature.purchaseHistory.products)

		//await user.save()*/

		response.status(200)

	} catch (error) {
		next(error)
	}
})



module.exports = purchaseRouter