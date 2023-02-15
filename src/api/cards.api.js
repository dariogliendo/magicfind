const express = require('express')
const router = express.Router()
const mtg = require('mtgsdk')

module.exports = (app) => {
  router.get('/api/cards', async (req,res) => {
    const { query } = req
    const cards = await mtg.card.where({name: query.name})
    console.log(cards)
    res.json(cards)
  })
  
  app.use('/', router)
}