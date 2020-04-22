const env = process.env.NODE_ENV

require('dotenv').config({ path:process.cwd() + `/.env.${env}` })

module.exports = {
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  host: process.env.HOST,
  dialect: process.env.DB_DIALECT
}