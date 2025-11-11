const loginRouter = require('express').Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const User = require('../models/User')

/*
Lets you login
@auth none
@route POST /api/login
@body { username, password }
@return { username, name, id, superSecretToken }
*/

loginRouter.post('/', async (request, response) => {
	const { username, password } = request.body
	const user = await User.findOne({ username }).populate('wishlist')
	// populate is basically just left join from sql
	const passwordCorrect = user === null
		? false
		: await bcrypt.compare(password, user.passwordHash)

	if (!(user && passwordCorrect)) {
		return response.status(401).json({
			error: 'Invalid username or password'
		}).end()
	}

	const userForToken = {
		username: user.username,
		id: user._id
	}

	const token = jwt.sign( // This part is unused at the moment but would be instrumental in securing the site
		userForToken,
		process.env.SECRET,
		{ expiresIn: 60*60 }
	) // Token lasts for 1 hour

	response
		.status(200)
		.send(
			{
				username: user.username,
				name: user.name,
				email: user.email,
				id: user._id,
				wishlist: user.wishlist,
				superSecretToken: token,
				addressSettings: user.addressSettings
			})
})

module.exports = loginRouter