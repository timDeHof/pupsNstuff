const http = require('http')
const app = require('./app')
const { PORT = 5000 } = process.env

const server = http.createServer(app)

server.listen(PORT, () => {
  console.log(`App listening on Port ${PORT}...`)
})
