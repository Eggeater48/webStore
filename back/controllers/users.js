const bcrypt = require('bcryptjs')

const userRouter = require('express').Router()
const User = require('../models/User')

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: handles user data
 */

/**
 * @swagger
 * /api/users/createNew:
 *   post:
 *     summary: Create a new user
 *     description: Creates a new user account with a hashed password.
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - name
 *               - email
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *                 example: "Grög"
 *               name:
 *                 type: string
 *                 example: "Greg"
 *               email:
 *                 type: string
 *                 format: email
 *                 example: "greg@greg.com"
 *               password:
 *                 type: string
 *                 format: password
 *                 minLength: 5
 *                 example: "123456"
 *     responses:
 *       201:
 *         description: User successfully created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   example: "690e051dee2e7357665a61d0"
 *                 username:
 *                   type: string
 *                   example: "Grög"
 *                 name:
 *                   type: string
 *                   example: "Greg"
 *                 email:
 *                   type: string
 *                   example: "greg@greg.com"
 *                 wishlist:
 *                   type: array
 *                   items:
 *                     type: string
 *                 addressSettings:
 *                   type: object
 *       400:
 *         description: Password too short or invalid request body
 *       500:
 *         description: Server error
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

/**
 * @swagger
 * /api/users/change/{id}:
 *   put:
 *     summary: Update user address settings
 *     description: Updates the address settings of a user by user ID.
 *     tags:
 *       - Users
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Unique identifier of the user
 *         schema:
 *           type: string
 *           example: "690e051dee2e7357665a61d0"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             description: Address settings object
 *             example:
 *               street: "Main Street 12"
 *               city: "Stockholm"
 *               postalCode: "12345"
 *               country: "Sweden"
 *     responses:
 *       201:
 *         description: User address settings successfully updated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 username:
 *                   type: string
 *                 email:
 *                   type: string
 *                 addressSettings:
 *                   type: object
 *       400:
 *         description: Invalid request body or user ID
 *       404:
 *         description: User not found
 *       500:
 *         description: Server error
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

/**
 * @swagger
 * /api/users/changeDetails/{id}:
 *   put:
 *     summary: Updates the users general details
 *     description: Updates the general details of an user by user ID.
 *     tags:
 *       - Users
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Unique identifier of the user
 *         schema:
 *           type: string
 *           example: "690e051dee2e7357665a61d0"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             description: User details object
 *             example:
 *               email: "grög@greg.com"
 *               name: "grog"
 *               username: "greggrog"
 *     responses:
 *       201:
 *         description: User details successfully changed
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 username:
 *                   type: string
 *                 email:
 *                   type: string
 *                 addressSettings:
 *                   type: object
 *       400:
 *         description: Invalid request body or user ID
 *       404:
 *         description: User not found
 *       500:
 *         description: Server error
 */
userRouter.put('/changeDetails/:id', async (request, response, next) => {
	try {
		const user = await User.findByIdAndUpdate(request.params.id, request.body)
		response.status(201).json(user)
	} catch (error) {
		next(error)
	}
})

/**
 * @swagger
 * /api/users/addToWishlist/{userId}/{id}:
 *   post:
 *     summary: Add a product to a user's wishlist
 *     description: Adds a product to the user's wishlist and returns the updated user with the wishlist populated.
 *     tags:
 *       - Users
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         description: Unique identifier of the user
 *         schema:
 *           type: string
 *           example: "690e051dee2e7357665a61d0"
 *       - in: path
 *         name: id
 *         required: true
 *         description: Unique identifier of the product to add to the wishlist
 *         schema:
 *           type: string
 *           example: "690e0a4bee2e7357665a61f2"
 *     responses:
 *       201:
 *         description: Product successfully added to wishlist
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 username:
 *                   type: string
 *                 email:
 *                   type: string
 *                 wishlist:
 *                   type: array
 *                   description: Populated list of products in the wishlist
 *                   items:
 *                     type: object
 *       400:
 *         description: Invalid user ID or product ID
 *       404:
 *         description: User or product not found
 *       500:
 *         description: Server error
 */

userRouter.post('/addToWishlist/:userId/:id', async (request, response) => {
	const user = await User.findById(request.params.userId)
	user.wishlist.push(request.params.id)

	await user.save()
	// I hate to do this this way but only option i could come up with tbh
	const populatedUser = await User.findById(request.params.userId).populate('wishlist')

	console.log(populatedUser)

	response.status(201).json(populatedUser)
})

/**
 * @swagger
 * /api/users/removeFromWishlist/{userId}/{id}:
 *   post:
 *     summary: Remove a product from a user's wishlist
 *     description: Removes a product from the user's wishlist by product ID.
 *     tags:
 *       - Users
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         description: Unique identifier of the user
 *         schema:
 *           type: string
 *           example: "690e051dee2e7357665a61d0"
 *       - in: path
 *         name: id
 *         required: true
 *         description: Unique identifier of the product to remove from the wishlist
 *         schema:
 *           type: string
 *           example: "690e0a4bee2e7357665a61f2"
 *     responses:
 *       200:
 *         description: Product successfully removed from wishlist
 *       400:
 *         description: Invalid user ID or product ID
 *       404:
 *         description: User or product not found
 *       500:
 *         description: Server error
 */

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

/**
 * @swagger
 * /api/users/removeUser:
 *   delete:
 *     summary: Delete a user
 *     description: Deletes a user by ID.
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - id
 *             properties:
 *               id:
 *                 type: string
 *                 description: Unique identifier of the user to delete
 *                 example: "690e051dee2e7357665a61d0"
 *     responses:
 *       204:
 *         description: User successfully deleted (no content)
 *       400:
 *         description: Invalid user ID
 *       404:
 *         description: User not found
 *       500:
 *         description: Server error
 */

userRouter.delete('/removeUser', async (request, response, next) => {
	try {
		await User.findByIdAndDelete(request.body.id)
		response.status(204).end()
	} catch (error) {
		next(error)
	}
})

/**
 * @swagger
 * /api/users/getAll:
 *   get:
 *     summary: Get all users
 *     description: Retrieves all users with their wishlist and orders populated, excluding password hashes.
 *     tags:
 *       - Users
 *     responses:
 *       200:
 *         description: List of users successfully retrieved
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   username:
 *                     type: string
 *                   name:
 *                     type: string
 *                   email:
 *                     type: string
 *                   wishlist:
 *                     type: array
 *                     description: Populated list of products in the wishlist
 *                     items:
 *                       type: object
 *                   orders:
 *                     type: array
 *                     description: Populated list of user's orders
 *                     items:
 *                       type: object
 *       500:
 *         description: Server error
 */

userRouter.get('/getAll', async (request, response, next) => {
	try {
		const result = await User.find({}).select(["-passwordHash", ])
			.populate('wishlist')
			.populate('orders')

		response.status(200).json(result).end()
	} catch (error) {
		next(error)
	}
})

module.exports = userRouter