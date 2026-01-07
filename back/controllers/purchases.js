//const bcrypt = require('bcryptjs');
const purchaseRouter = require('express').Router()
const User = require('../models/User')
const Product = require('../models/Products')
const Order = require('../models/Orders')

/*
* Checkout purchase
* @auth should be the users token
*	@route POST /api/checkout/:id
* @return {
*  user,
*  createdAt,
*  products:
* 	 [ { productData: [ just a plain ol product ], quantity, totalPrice, purchaseDate, id } ],
* }
*  */
purchaseRouter.post('/checkout/:id', async (request, response, next) => {
	try {
		const productIds = request.body.products.map(product => product.id)
		const products = await Product.find({ '_id': { $in: productIds } })
		await Product.updateMany({ '_id': { $in: productIds }}, { $inc: { stock: -1, purchaseCount: 1 } })
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

		const result = await Order.findOneAndUpdate({ user: request.params.id }, { products: combined, status: "Processing" }, {
			new: true,
			upsert: true
		})

		const user = await User.findById(request.params.id)

		user.orders = user.orders.concat(result._id)
		//await user.save()

		response.status(200).json(result).end()
	} catch (error) {
		next(error)
	}
})

/**
 * @swagger
 * /api/purchases/orders:
 *   get:
 *     summary: Get all orders
 *     description: Retrieves all orders with the user and product details populated.
 *     tags:
 *       - Purchases
 *     responses:
 *       200:
 *         description: List of all orders successfully retrieved
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                   user:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                       username:
 *                         type: string
 *                       email:
 *                         type: string
 *                   products:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         product:
 *                           type: object
 *                           description: Populated product details
 *                         productData:
 *                           type: array
 *                           items:
 *                             type: string
 *                         totalPrice:
 *                           type: number
 *                         quantity:
 *                           type: integer
 *                         purchaseDate:
 *                           type: string
 *                           format: date-time
 *                   status:
 *                     type: string
 *                     example: "Processing"
 *       500:
 *         description: Server error
 */
purchaseRouter.get('/orders', async (request, response, next) => {
	try {
		const result = await Order
			.find({})
			.populate('user')
			.populate({
				path: 'products',
				populate: { path: 'productData' }
			})

		response.status(200).json(result).end()
	} catch (error) {
		next(error)
	}
})

/**
 * @swagger
 * /api/purchases/orders/{id}:
 *   get:
 *     summary: Get orders for a specific user
 *     description: Retrieves the first order of a specific user with populated product details.
 *     tags:
 *       - Purchases
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Unique identifier of the user
 *         schema:
 *           type: string
 *           example: "690e051dee2e7357665a61d0"
 *     responses:
 *       200:
 *         description: User's order successfully retrieved
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                 user:
 *                   type: string
 *                 products:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       productData:
 *                         type: array
 *                         items:
 *                           type: string
 *                       totalPrice:
 *                         type: number
 *                       quantity:
 *                         type: integer
 *                       purchaseDate:
 *                         type: string
 *                         format: date-time
 *                 status:
 *                   type: string
 *                   example: "Processing"
 *       404:
 *         description: Order or user not found
 *       500:
 *         description: Server error
 */
purchaseRouter.get('/orders/:id', async (request, response, next) => {
	try {
		const result = await Order
			.find({ user: request.params.id })
			.populate({
				path: 'products',
				populate: { path: 'productData' }
			})

		response.status(200).json(result[0]).end()
	} catch (error) {
		next(error)
	}
})

/**
 * @swagger
 * /api/purchases/orders/{id}:
 *   put:
 *     summary: Update an order
 *     description: Updates an existing order by order ID and returns the updated order with user and product details populated.
 *     tags:
 *       - Purchases
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Unique identifier of the order to update
 *         schema:
 *           type: string
 *           example: "690e0b1dee2e7357665a6203"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             description: Fields to update in the order
 *             example:
 *               status: "Shipped"
 *               products:
 *                 - productData: ["690e0a4bee2e7357665a61f2"]
 *                   quantity: 2
 *                   totalPrice: 259.98
 *                   purchaseDate: "2026-01-06T10:00:00.000Z"
 *     responses:
 *       200:
 *         description: Order successfully updated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                 user:
 *                   type: object
 *                 products:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       product:
 *                         type: object
 *                       productData:
 *                         type: array
 *                         items:
 *                           type: string
 *                       totalPrice:
 *                         type: number
 *                       quantity:
 *                         type: integer
 *                       purchaseDate:
 *                         type: string
 *                         format: date-time
 *                 status:
 *                   type: string
 *                   example: "Shipped"
 *       400:
 *         description: Invalid request body
 *       404:
 *         description: Order not found
 *       500:
 *         description: Server error
 */

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