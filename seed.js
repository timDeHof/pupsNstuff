const client = require('./client')
const { createPuppy } = require('./adapters')
const { puppies } = require('./seedData')

// Drop Tables

// Create Tables

// Seed our Data

const rebuildDb = async () => {
  client.connect()
  try {
  } catch (error) {
    throw error
  } finally {
    client.end()
  }
}

rebuildDb()
