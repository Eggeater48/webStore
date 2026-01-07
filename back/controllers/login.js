const loginRouter = require('express').Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const User = require('../models/User')

/**
 * @swagger
 * tags:
 *   name: LogIn
 *   description: Handles login operations and such
 */

/**
 * @swagger
 * /api/login:
 *   post:
 *     summary: Log in a user
 *     description: Authenticates a user using their username or email and password. Returns user data and a JWT token if successful.
 *     tags:
 *       - LogIn
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - userDetails
 *               - password
 *             properties:
 *               userDetails:
 *                 type: string
 *                 description: Username or email of the user
 *                 example: "greg@greg.com"
 *               password:
 *                 type: string
 *                 format: password
 *                 description: User's password
 *                 example: "123456"
 *     responses:
 *       200:
 *         description: Successfully authenticated, returns user data and JWT token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 username:
 *                   type: string
 *                 name:
 *                   type: string
 *                 email:
 *                   type: string
 *                 id:
 *                   type: string
 *                 wishlist:
 *                   type: array
 *                   items:
 *                     type: object
 *                 superSecretToken:
 *                   type: string
 *                   description: JWT token valid for 1 hour
 *                 addressSettings:
 *                   type: object
 *       401:
 *         description: Invalid username/email or password
 *       500:
 *         description: Server error
 */
loginRouter.post('/', async (request, response) => {
	const { userDetails, password } = request.body
	const user = await User.findOne({
		$or: [ {email: userDetails}, {username: userDetails}  ]
	} ).populate('wishlist') // populate is basically just left join from sql
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
				addressSettings: user.addressSettings,
				phoneNumber: user.phoneNumber
			})
})

module.exports = loginRouter