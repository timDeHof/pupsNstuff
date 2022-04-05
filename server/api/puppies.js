const router = require('express').Router()
const { getPuppies } = require('../../db/adapters/puppies')

router.get('/', async (req, res, next) => {
  try {
    const puppies = await getPuppies()
    res.send(puppies)
  } catch (error) {
    next(error)
  }
})

module.exports = router
