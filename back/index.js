const app = require('./app')
const config = require('./utils/logger')

app.listen(config.port, () => {
	console.log(`app running on port ${config.port}`)
})