// This is just console.logging but for when the env is set to dev
// which atp is never cause that didnt work with my docker installation for some reason

const info = (...params) => {
	if (process.env.NODE_ENV !== 'test') {
		console.log(...params)
	}
}

const error = (...params) => {
	if (process.env.NODE_ENV !== 'test') {
		console.error(...params)
	}
}

module.exports = {
	info,
	error
}