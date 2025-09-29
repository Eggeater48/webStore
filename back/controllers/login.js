const loginRouter = require('express').Router()
const bcrypt = require('bcryptjs')
//const jwt = require('jsonwebtoken')

// This route should only handle logging in
// Could also implement login tokens if i want to

loginRouter.post('/', async (request, response) => {
	const { username, password } = request.body

	const user = await User.findOne()

	const passwordCorrect = user === null
		? false
		: await bcrypt.compare(password, user.passwordHash)

	if (!(user && passwordCorrect)) {
		response.status(401).json({
			error: 'Invalid username or password'
		}).end()
	}

	response.status(200).send({username: user.username, name: user.name, id: user._id })

	/*const userForToken = {
		username: user.username,
		id: user._id
	}

	const token = jwt.sign(
		userForToken,
		process.env.SECRET,
		{ expiresIn: 60*60 }
	) // 1 hour */

})

module.exports = loginRouter