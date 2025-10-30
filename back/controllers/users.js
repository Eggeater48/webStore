const bcrypt = require('bcryptjs')

const userRouter = require('express').Router()
const User = require('../models/User')

/*
Creates a new user
@auth none
@route POST /api/users/createNew
@body { username, name, email, password }
@return { username, name, id, email, passwordHash }
*/

userRouter.post('/createNew', async (request, response, next) => {	
	try {
		const { username, name, email, password } = request.body

		if (password.length < 5) {
			response.status(400).json({'error' : 'The password is too short (atleast 5 letters)'}).end()
		} else {
			const passwordHash = await bcrypt.hash(password, 10)

			const user = new User({
				username,
				name,
				email,
				passwordHash,
				wishlist: []
			})
			// Has to be saved here cuz otherwise it just skips saving if you put it at the end of line 20!!
			const saveUser = await user.save()

			response.status(201).json(saveUser)
		}
	} catch (error) {
		next(error)
	}
})

/*
Adds an item to the wishlist array of the user
@auth none
@route POST /api/users/addToWishlist/:id
@body { productId }
@return { updated user object }
*/
// There probably should be some auth here but...
userRouter.post('/addToWishlist/:id', async (request, response) => {
	const user = User.findById(request.params.id)

	user.wishlist.append(request.body) 

	console.log(user)
})

module.exports = userRouter