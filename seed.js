const client = require('./client')
const { createPuppy, getPuppies } = require('./adapters')
const { puppies } = require('./seedData')

// Drop Tables
const dropTables = async () => {
  console.log('...dropping tables')
  await client.query(`
    DROP TABLE IF EXISTS puppies`)
}
// Create Tables
const createTables = async () => {
  console.log('...creating tables')
  await client.query(`
    CREATE TABLE puppies (
        id SERIAL PRIMARY KEY,
        name VARCHAR (255) NOT NULL,
        email VARCHAR (255) UNIQUE NOT NULL,
        "isCute" BOOLEAN DEFAULT true,
        age INTEGER
    )
    `)
}
// Seed our Data
const seedDb = async () => {
  console.log('...seeding puppies')
  for (const puppy of puppies) {
    await createPuppy(puppy)
  }
}

const rebuildDb = async () => {
  client.connect()
  try {
    await dropTables()
    await createTables()
    await seedDb()
    const puppies = await getPuppies()
    console.log(puppies)
  } catch (error) {
    throw error
  } finally {
    client.end()
  }
}

rebuildDb()
