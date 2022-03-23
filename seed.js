const client = require('./client')
const { createPuppy } = require('./adapters')
const { puppies } = require('./seedData')

// Drop Tables
const dropTables = async () => {
  console.log(`...dropping tables`)
  await client.query(`
        DROP TABLE IF EXISTS puppies;
    `)
  console.log(`...tables dropped`)
}

// Create Tables
const createTables = async () => {
  console.log(`...creating tables`)
  await client.query(`
        CREATE TABLE puppies (
            id SERIAL PRIMARY KEY,
            name VARCHAR (255) NOT NULL,
            email VARCHAR (255) UNIQUE NOT NULL,
            "isCute" BOOLEAN DEFAULT true,
            age INTEGER
        );
    `)
  console.log(`...tables created`)
}
// Seed our Data
const seedDb = async () => {
  console.log(`...seeding the data`)
  for (const puppy of puppies) {
    await createPuppy(puppy)
  }
  console.log(`...information seeded`)
}

const rebuildDb = async () => {
  client.connect()
  try {
    await dropTables()
    await createTables()
    await seedDb()
  } catch (error) {
    console.error(error)
  } finally {
    client.end()
  }
}

rebuildDb()
