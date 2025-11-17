const config = require('./utils/config')

const express = require('express')
const cors = require('cors')

const app = express()

const productRouter = require('./controllers/products')
const userRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const purchaseRouter = require('./controllers/purchases')

const middleware = require('./utils/middleware')
const mongoose = require("mongoose");

mongoose.set("strictQuery", false)

mongoose.connect(config.MONGODB_URL)
	.then(() => {
		console.log('Successfully connected to MongoDB')
	})
	.catch((error) => {
		console.error('Couldnt connect to MongoDB ', error.message)
	})

app.use(cors())
app.use(express.json())
app.use(middleware.requestLogger)

app.use('/api/products', productRouter)
app.use('/api/users', userRouter)
app.use('/api/login', loginRouter)
app.use('/api/purchases', purchaseRouter)

app.use(middleware.errorHandler)

module.exports = app