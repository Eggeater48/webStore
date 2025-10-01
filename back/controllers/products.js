const productRouter = require('express').Router()
const Product = require('../models/Products')


// Middleware import goes here (mainly needed for token verification)

productRouter.get('/getAll', async (request, response) => {
	const result = await Product.find({})
	response.status(200).json(result)
})

productRouter.post('/addNew', async (request, response) => {
	await Product.insertOne(request.body) // TODO add token validation and maybe also
	response.status(201).end()
})

productRouter.delete('/deleteOne/:id', async (request, response) => {
	await Product.findByIdAndDelete(request.params.id)
	response.status(204).end()
})

productRouter.put('/changeItem/:id', async (request, response) => {
	await Product.findByIdAndUpdate(request.params.id, request.body)
	response.status(200).end()
})

// Change existing
// adding reviews should come with changeExisting
// And adding ratings too of course



module.exports = productRouter