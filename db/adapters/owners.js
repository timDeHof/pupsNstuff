const client = require('../client')

const createOwner = async (owner) => {
  const { name } = owner
  await client.query(
    `
        INSERT INTO owners (name)
        VALUES ($1)
    `,
    [name]
  )
}

const getOwners = async () => {
  const { rows: owners } = await client.query(`
        SELECT * FROM owners
    `)
  return owners
}

module.exports = { createOwner, getOwners }
