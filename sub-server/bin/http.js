const env = process.env.NODE_ENV

require('dotenv').config({ path:process.cwd() + `/.env.${env}` })

const app = require('../app')
const http = require('http')
const server = http.createServer(app)

server.listen(process.env.PORT,() => {
  console.log('SERVER OK' + process.env.PORT)
})