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
  const { rows: puppies } = await client.query(`
        SELECT * FROM puppies
    `)
  delete puppies[0].password
  return puppies
}

module.exports = { createPuppy, getPuppies }
