const client = require('../client')

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
        SELECT * FROM puppies
    `)
  return rows
}

module.exports = { createPuppy, getPuppies }
