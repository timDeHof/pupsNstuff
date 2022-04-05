const client = require('../client')

const createTrick = async (trick) => {
  const { title } = trick
  await client.query(
    `
    INSERT INTO tricks (title)
    VALUES ($1)
  `,
    [title]
  )
}

const getTricks = async () => {
  const { rows } = await client.query(`
        SELECT * FROM tricks
    `)
  return rows
}

module.exports = { createTrick, getTricks }
