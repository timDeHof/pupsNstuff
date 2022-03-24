const client = require('./client')
const { createPuppy, getPuppies } = require('./adapters/puppies')
const { puppies, owners, tricks } = require('./seedData')
const { createOwner, getOwners } = require('./adapters/owners')
const { createTrick, getTricks } = require('./adapters/tricks')

// Drop Tables
const dropTables = async () => {
  console.log('...dropping tables')
  await client.query(`
      DROP TABLE IF EXISTS tricks;
      DROP TABLE IF EXISTS puppies;
      DROP TABLE IF EXISTS owners;
    `)
}
// Create Tables
const createTables = async () => {
  console.log(`...creating owners table`)
  await client.query(`
      CREATE TABLE owners (
        id SERIAL PRIMARY KEY,
        name VARCHAR (255) NOT NULL
      )
    `)

  console.log('...creating puppies tables')
  await client.query(`
      CREATE TABLE puppies (
          id SERIAL PRIMARY KEY,
          name VARCHAR (255) NOT NULL,
          email VARCHAR (255) UNIQUE NOT NULL,
          "isCute" BOOLEAN DEFAULT true,
          age INTEGER,
          "ownerId" INTEGER REFERENCES owners(id)
    );
    `)

  console.log(`...creating tricks table`)
  await client.query(`
      CREATE TABLE tricks (
        id SERIAL PRIMARY KEY,
        title VARCHAR
      )
  `)
}
// Seed our Data
const seedDb = async () => {
  console.log(`...seeding owners`)
  for (const owner of owners) {
    await createOwner(owner)
  }
  console.log('...seeding puppies')
  for (const puppy of puppies) {
    await createPuppy(puppy)
  }

  console.log(`...seeding tricks`)
  for (const trick of tricks) {
    await createTrick(trick)
  }
}

const rebuildDb = async () => {
  client.connect()
  try {
    await dropTables()
    await createTables()
    await seedDb()
    const puppies = await getPuppies()
    const owners = await getOwners()
    const tricks = await getTricks()
    // console.log('Puppies:', puppies)
    // console.log('Owners:', owners)
    // console.log('Tricks:', tricks)
  } catch (error) {
    console.error(error)
  } finally {
    client.end()
  }
}

rebuildDb()
