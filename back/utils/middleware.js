//const jwt = require('jsonwebtoken')

const logger = require('./logger')

// Mostly just for debugging purposes altho it just floods the console / cmd most of the time
const requestLogger = (request, response, next) => {
	logger.info('--------')
	logger.info('Method |', request.method)
	logger.info('Path   |', request.path)
	logger.info('Body   |', request.body)
	logger.info('Date   |', new Date().toISOString()) // Please fix me someday.. I want to display the date with the correct timezone
	logger.info('--------')
	next()
}

// doesnt even work even tho its implemented correctly
const unknownEndpoint = (request, response) => {
	response.status(404).send({ error: 'unknown endpoint' })
}

// TODO implement token and user extractor middleware

// Beautiful block that has saved so much precious time
// Any next(error)'s get passed to this
const errorHandler = (error, request, response, next) => {
	if (error.name === 'CastError') {
		logger.error(error.stack)
		return response.status(400).send({ error: 'malformatted id' })
	} else if (error.name === 'ValidationError') {
		return response.status(400).json({ error: error.message})
	} else if (error.name === 'MongoServerError' && error.message.includes('E11000 duplicate key error')) {
		return response.status(400).json({ error: 'expected `username` to be unique' })
	} else if (error.name ===  'JsonWebTokenError') {
		return response.status(401).json({ error: 'token missing or invalid' })
	} else if (error.name === 'TokenExpiredError') {
		return response.status(401).json({
			error: 'Token Expired'
		})
	}
	next(error)
}

module.exports = {
	requestLogger,
	unknownEndpoint,
	errorHandler
}