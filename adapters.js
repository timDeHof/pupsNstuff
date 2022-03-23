const client = require('./client')

const createPuppy = async (puppy) => {
  // Add a puppy (passed in) to our db
  const { name, email, age } = puppy
  await client.query(
    `
    INSERT INTO puppies (name, email, age)
    VALUES ($1, $2, $3);
  `,
    [name, email, age]
  )
}

module.exports = { createPuppy }
