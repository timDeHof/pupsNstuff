const client = require('./client')
const { createPuppy, getPuppies } = require('./adapters/puppies')
const { puppies, owners, tricks, puppies_tricks } = require('./seedData')
const { createOwner, getOwners } = require('./adapters/owners')
const { createTrick, getTricks } = require('./adapters/tricks')
const { createPuppyTrick } = require('./adapters/puppies_tricks')

// Drop Tables
const dropTables = async () => {
  console.log('...dropping tables')
  await client.query(`
      DROP TABLE IF EXISTS puppies_tricks;
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

  console.log(`...creating puppies_tricks table`)
  await client.query(`
        CREATE TABLE puppies_tricks (
          puppy_id INTEGER REFERENCES puppies(id),
          trick_id INTEGER REFERENCES tricks(id),
          UNIQUE(puppy_id, trick_id)
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

  console.log(`...seeding puppies_tricks`)
  for (const puppy_trick of puppies_tricks) {
    await createPuppyTrick(puppy_trick)
  }
}

const rebuildDb = async () => {
  client.connect()
  try {
    await dropTables()
    await createTables()
    await seedDb()
    // const puppies = await getPuppies()
    // const owners = await getOwners()
    // const tricks = await getTricks()
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

// SELECT * FROM puppies
// JOIN puppies_tricks
// ON puppies.id = puppies_tricks.puppy_id
// JOIN tricks
// ON puppies_tricks.trick_id = tricks.id
// WHERE puppies.id = 1
