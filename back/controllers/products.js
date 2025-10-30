const productRouter = require('express').Router()
const Product = require('../models/Products')


// Middleware import goes here (mainly needed for token verification)

/*
Gets all the products
@auth none
@route GET /api/products/getAll
@return [ { product1 }, { product2 } ... ]
*/

productRouter.get('/getAll', async (request, response) => {
	const result = await Product.find({})
	response.status(200).json(result)
})

/*
Adds a new product
@auth admin
@route POST /api/products/addNew
*/
productRouter.post('/addNew', async (request, response) => {
	await Product.insertOne(request.body) // TODO add token validation and maybe also
	response.status(201).end()
})

/*
Deletes a product
@auth admin
@route DELETE /api/products/deleteOne/:id
*/
productRouter.delete('/deleteOne/:id', async (request, response) => {
	await Product.findByIdAndDelete(request.params.id)
	response.status(204).end()
})

/*
Change an existing items data
@auth admin
@route PUT /api/products/changeItem/:id
*/
productRouter.put('/changeItem/:id', async (request, response) => {
	await Product.findByIdAndUpdate(request.params.id, request.body)
	response.status(200).end()
})

module.exports = productRouter