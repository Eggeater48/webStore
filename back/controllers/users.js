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
@route POST /api/users/addToWishlist/
@body { userID, productId }
@return { updated user object }
*/
// There probably should be some auth here but...
userRouter.post('/wishlist/addToWishlist/', async (request, response) => {
	const user = User.findById(request.user)

	user.wishlist.append(request.params.id)

	console.log(user)
})

/*
Just returns an users wishlist
@auth none
@route GET /api/users/:id
@return { wishlist }
*/
// TODO remember to add token verification to this part
userRouter.get('/wishlist/', async (request, response, next) => {
	try {
		const users = await User
			.findById(request.user)
			.populate('wishlist', { title: 1, price: 1, images: 1 })
		response.json(users)
	} catch (error) {
		next(error)
	}
})

module.exports = userRouter