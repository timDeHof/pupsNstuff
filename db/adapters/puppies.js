const client = require('../client')
const { mapTheRows } = require('./utils')

const createPuppy = async (puppy) => {
  // Add a puppy (passed in) to our db
  const { name, email, age, ownerId } = puppy
  await client.query(
    `
    INSERT INTO puppies (name, email, age, "ownerId")
    VALUES ($1, $2, $3, $4)
  `,
    [name, email, age, ownerId]
  )
}

const getPuppies = async () => {
  const { rows } = await client.query(`
  SELECT puppies.id as id, puppies.name as name, puppies.email as email, puppies."isCute" as "isCute", puppies.age as age, puppies."ownerId" as "ownerId", tricks.id as "trickId", tricks.title as "trickTitle" FROM puppies
  LEFT JOIN puppies_tricks ON puppies.id = puppies_tricks.puppy_id
  LEFT JOIN tricks ON puppies_tricks.trick_id = tricks.id
    `)
  return mapTheRows(rows)
}

module.exports = { createPuppy, getPuppies }
