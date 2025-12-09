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
				wishlist: [],
				addressSettings: {}
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
USed for adding the users address deets during the buying phase
@auth none (there for real should be alot of auth but its kind hard to implement and i dont wanna)
@route PUT /api/users/change/:id
@body { object with all the deets }
@return { updated cooler user object }
 */
userRouter.put('/change/:id', async (request, response, next) => {
	try {
		const user = await User.findByIdAndUpdate(request.params.id, { addressSettings: request.body })
		console.log(user)
		response.status(201).json(user)
	} catch (error) {
		next(error)
	}
})

/*
Adds an item to the wishlist array of the user
@auth none
@route POST /api/users/addToWishlist/:id
@body { userID }
@return { updated user object }
*/
// There probably should be some auth here but...
userRouter.post('/addToWishlist/:userId/:id', async (request, response) => {
	const user = await User.findById(request.params.userId)
	user.wishlist.push(request.params.id)

	await user.save()
	// I hate to do this this way but only option i could come up with tbh
	const populatedUser = await User.findById(request.params.userId).populate('wishlist')

	console.log(populatedUser)

	response.status(201).json(populatedUser)
})

// Once again implement the tokens, so user doesnt need to be sent in such a weird way
userRouter.post('/removeFromWishlist/:userId/:id', async (request, response, next) => {
	try {
		const user = await User.findById(request.params.userId)
		await user.wishlist.splice(user.wishlist.indexOf(request.params.id), 1)
		await user.save()

		response.status(200)

	} catch (error) {
		next(error)
	}
})

userRouter.delete('/removeUser', async (request, response, next) => {
	try {
		console.log(request.body.id)
		await User.findByIdAndDelete(request.body.id)
		response.status(204).end()
	} catch (error) {
		next(error)
	}
})

module.exports = userRouter