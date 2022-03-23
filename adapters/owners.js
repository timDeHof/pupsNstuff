const client = require('../client')

const createOwner = async (owner) => {
  const { name, email, age } = owner
  await client.query(
    `
        INSERT INTO owners (name, email, age)
        VALUES ($1, $2, $3)
    `,
    [name, email, age]
  )
}

const getOwners = async () => {
  const { rows: owners } = await client.query(`
        SELECT * FROM owners
    `)
  return owners
}

module.exports = { createOwner, getOwners }
