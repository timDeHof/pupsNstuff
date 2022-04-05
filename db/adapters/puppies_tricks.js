const client = require('../client')

const createPuppyTrick = async ({ puppy_id, trick_id }) => {
  await client.query(
    `
        INSERT INTO puppies_tricks (puppy_id, trick_id)
        VALUES ($1, $2)
    `,
    [puppy_id, trick_id]
  )
}

module.exports = {
  createPuppyTrick,
}
