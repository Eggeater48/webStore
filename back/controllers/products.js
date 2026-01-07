const productRouter = require('express').Router()
const Product = require('../models/Products')

// Middleware import goes here (mainly needed for token verification)

/**
 * @swagger
 * /api/products/getAll:
 *   get:
 *     tags: [Products]
 *     summary: Gets all the products
 *     responses:
 *       200:
 *         description: A list of all the products
 */

productRouter.get('/getAll', async (request, response) => {
	const result = await Product.find({}).sort({ purchaseCount: -1 })
	response.status(200).json(result)
})

/**
 * @swagger
 * /api/products/addNew:
 *   post:
 *     summary: Add a new product
 *     description: Creates a new product entry in the database. Authentication will be added later.
 *     tags:
 *       - Products
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - price
 *               - category
 *             properties:
 *               meta:
 *                 type: object
 *                 properties:
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *                     example: "2025-04-30T09:41:02.053Z"
 *                   updatedAt:
 *                     type: string
 *                     format: date-time
 *                     example: "2025-04-30T09:41:02.053Z"
 *                   barcode:
 *                     type: string
 *                     example: "4091737746820"
 *                   qrCode:
 *                     type: string
 *                     example: "https://cdn.dummyjson.com/public/qr-code.png"
 *               title:
 *                 type: string
 *                 example: "Chanel Coco Noir Eau De"
 *               description:
 *                 type: string
 *                 example: "Coco Noir by Chanel is an elegant and mysterious fragrance..."
 *               category:
 *                 type: string
 *                 example: "fragrances"
 *               price:
 *                 type: number
 *                 example: 129.99
 *               discountPercentage:
 *                 type: number
 *                 example: 16.51
 *               rating:
 *                 type: number
 *                 example: 4.26
 *               stock:
 *                 type: integer
 *                 example: 55
 *               tags:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["fragrances", "perfumes"]
 *               brand:
 *                 type: string
 *                 example: "Chanel"
 *               sku:
 *                 type: string
 *                 example: "FRA-CHA-CHA-007"
 *               weight:
 *                 type: number
 *                 example: 7
 *               dimensions:
 *                 type: object
 *                 properties:
 *                   width:
 *                     type: number
 *                     example: 24.5
 *                   height:
 *                     type: number
 *                     example: 25.7
 *                   depth:
 *                     type: number
 *                     example: 25.98
 *               warrantyInformation:
 *                 type: string
 *                 example: "3 year warranty"
 *               shippingInformation:
 *                 type: string
 *                 example: "Ships overnight"
 *               availabilityStatus:
 *                 type: string
 *                 example: "In Stock"
 *               returnPolicy:
 *                 type: string
 *                 example: "No return policy"
 *               minimumOrderQuantity:
 *                 type: integer
 *                 example: 1
 *               images:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example:
 *                   - "https://cdn.dummyjson.com/product-images/fragrances/chanel-coco-noir-eau-de/1.webp"
 *                   - "https://cdn.dummyjson.com/product-images/fragrances/chanel-coco-noir-eau-de/2.webp"
 *               thumbnail:
 *                 type: string
 *                 example: "https://cdn.dummyjson.com/product-images/fragrances/chanel-coco-noir-eau-de/thumbnail.webp"
 *               createdAt:
 *                 type: string
 *                 format: date-time
 *                 example: "2025-11-07T14:41:33.131Z"
 *               updatedAt:
 *                 type: string
 *                 format: date-time
 *                 example: "2026-01-06T06:36:55.287Z"
 *               purchaseCount:
 *                 type: integer
 *                 example: 2
 *               id:
 *                 type: string
 *                 example: "690e051dee2e7357665a61d0"
 *     responses:
 *       201:
 *         description: Product successfully created
 *       500:
 *         description: Server error
 */

productRouter.post('/addNew', async (request, response) => {
	await Product.insertOne(request.body) // TODO add token validation and maybe also
	response.status(201).end()
})

/**
 * @swagger
 * /api/products/deleteOne/{id}:
 *   delete:
 *     summary: Delete a product
 *     description: Deletes a product by its unique ID.
 *     tags:
 *       - Products
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Product id
 *         schema:
 *           type: string
 *           example: "690e051dee2e7357665a61d0"
 *     responses:
 *       204:
 *         description: Product successfully deleted (no content)
 *       400:
 *         description: Invalid product ID
 *       404:
 *         description: Product not found
 *       500:
 *         description: Server error
 */

productRouter.delete('/deleteOne/:id', async (request, response) => {
	await Product.findByIdAndDelete(request.params.id)
	response.status(204).end()
})

/**
 * @swagger
 * /api/products/changeItem/{id}:
 *   put:
 *     summary: Update a product
 *     description: Updates an existing product by its unique ID.
 *     tags:
 *       - Products
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The products id
 *         schema:
 *           type: string
 *           example: "690e051dee2e7357665a61d0"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             description: Fields to update (partial product object)
 *             example:
 *               price: 119.99
 *               stock: 42
 *               availabilityStatus: "Limited Stock"
 *     responses:
 *       200:
 *         description: Successfully updated
 *       500:
 *         description: Server error
 */

productRouter.put('/changeItem/:id', async (request, response) => {
	await Product.findByIdAndUpdate(request.params.id, request.body)
	response.status(200).end()
})

/**
 * @swagger
 * /api/products/addReview/{id}:
 *   put:
 *     summary: Add a review to a product
 *     description: Adds a new review to the specified product.
 *     tags:
 *       - Products
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Unique identifier of the product
 *         schema:
 *           type: string
 *           example: "690e051dee2e7357665a61d0"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - rating
 *               - comment
 *             properties:
 *               rating:
 *                 type: number
 *                 minimum: 1
 *                 maximum: 5
 *                 example: 4.5
 *               comment:
 *                 type: string
 *                 example: "Amazing fragrance, long-lasting and elegant."
 *               reviewer:
 *                 type: string
 *                 example: "John Doe"
 *               createdAt:
 *                 type: string
 *                 format: date-time
 *                 example: "2026-01-06T08:15:30.000Z"
 *     responses:
 *       201:
 *         description: Review successfully added
 *       500:
 *         description: Server error
 */

productRouter.put('/addReview/:id', async (request, response, next) => {
	try {
		const product = await Product.findById(request.params.id, {}, {})
		product.reviews.push(request.body)
		await product.save()
		response.status(201).end()
	} catch (error) {
		next(error)
	}
})

module.exports = productRouter