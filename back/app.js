const config = require('./utils/config')

const express = require('express')
const cors = require('cors')

const app = express()

const productRouter = require('./controllers/products')
const userRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')

// Middleware goes here

// Mongoose boot and connection check goes here

app.use(cors())
app.use(express.json())

// middleware use goes here

app.use('/api/products', productRouter)
app.use('/api/users', userRouter)
app.use('/api/login', loginRouter)
module.exports = app