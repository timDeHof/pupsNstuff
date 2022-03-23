const client = require('./client')

const createPuppy = async (puppy) => {
  // Add a puppy (passed in) to our db
  const { name, email, age } = puppy
  await client.query(
    `
  INSERT INTO puppies (name, email, age)
  VALUES ($1, $2, $3)
  `,
    [name, email, age]
  )
}

const getPuppies = async () => {
  const { rows: puppies } = await client.query(`
        SELECT * FROM puppies
    `)
  return puppies
}

module.exports = { createPuppy, getPuppies }
