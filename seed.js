const client = require('./client')
const { createPuppy } = require('./adapters')
const { puppies } = require('./seedData')

// Drop Tables

// Create Tables

// Seed our Data

const rebuildDb = async () => {
  client.connect()
  try {
    console.log(client)
  } catch (error) {
    console.error(error)
  } finally {
    client.end()
  }
}

rebuildDb()
