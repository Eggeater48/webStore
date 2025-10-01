const productRouter = require('express').Router()
const Product = require('../models/Products')


// Middleware import goes here

// :/id remember to use me!!

productRouter.get('/getAll', async (request, response) => {
	const result = await Product.find({})
	response.json(result)
})

productRouter.post('/addNew', async (request, response) => {
	co
})

productRouter.delete('/deleteOne/:id', async (request, response) => {

})

productRouter.put('/changeItem/:id', async (request, response) => {

})

// Change existing
// adding reviews should come with changeExisting
// And adding ratings too of course



module.exports = productRouter