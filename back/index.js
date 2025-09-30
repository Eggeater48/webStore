const app = require('./app')
const config = require('./utils/config')

app.listen(config.PORT, () => {
	console.log(`App successfully running on port ${config.PORT}`)
})