const express = require('express')
const morgan = require('morgan')

const app = express()

const client = require('../db/client')
client.connect()

app.use(morgan('tiny'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api', require('./api'))

app.use((error, req, res, next) => {
  res.send({ sucess: false, message: error.message })
})

module.exports = app
