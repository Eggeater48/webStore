const bcrypt = require('bcryptjs')

const userRouter = require('express').Router()
const User = require('../models/User')

userRouter.post('/createNew', async (request, response) => {
	const { username, name, email, password } = request.body

	if (password.length < 5) {
		response.status(400).json({'error' : 'The password is too short (atleast 5 letters)'}).end()
	} else {
		const passwordHash = await bcrypt.hash(password, 10)

		const user = new User({
			username,
			name,
			email,
			passwordHash
		})
		// Has to be saved here cuz otherwise it just skips saving if you put it at the end of line 20!!
		const saveUser = await user.save()

		response.status(201).json(saveUser)
	}
})

userRouter.post('/addToWishlist/:id', async (request, response) => {
	const user = User.findById(request.params.id)

	user.wishlist = request.body

	console.log(user)
})

module.exports = userRouter