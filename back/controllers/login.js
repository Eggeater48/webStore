const loginRouter = require('express').Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const User = require('../models/User')

loginRouter.post('/', async (request, response) => {
	const { username, password } = request.body

	const user = await User.findOne({ username })

	const passwordCorrect = user === null
		? false
		: await bcrypt.compare(password, user.passwordHash)

	if (!(user && passwordCorrect)) {
		response.status(401).json({
			error: 'Invalid username or password'
		}).end()
	}

	const userForToken = {
		username: user.username,
		id: user._id
	}

	const token = jwt.sign(
		userForToken,
		process.env.SECRET,
		{ expiresIn: 60*60 }
	) // 1 hour

	response.status(200).send({username: user.username, name: user.name, id: user._id, superSecretToken: token })
})

module.exports = loginRouter