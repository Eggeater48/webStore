const productRouter = require('express').Router()

// Models go here

// Middleware import goes here

// :/id remember to use me!!

productRouter.get('/getAll', async (request, response) => {
	const result = await Product.find({})
	response.json(result)
})

// Add new product

// Remove product

// Change existing
// adding reviews should come with changeExisting
// And adding ratings too of course



module.exports = productRouter