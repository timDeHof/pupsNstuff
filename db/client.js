const { Client } = require('pg') // imports the pg module

const client = new Client('postgres://localhost:5432/pupsNstuff')

module.exports = client
