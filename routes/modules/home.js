const express = require('express')
const router = express.Router()
const Record = require('../../models/record')
const Category = require('../../models/category')
const categoryJSON = require('../../models/seeds/category.json')

router.get('/', async (req, res, next) => {
  const userId = req.user._id
  
  Record.find({ userId })
    .lean()
    .then(records => {
      const total_cost = records.reduce((sum, record) => sum + record.amount, 0)
      records = records.map(record => {
        record.date = new Date(record.date).toLocaleDateString()
        return record
      })
      res.render('index', { records, total_cost })
    })
    .catch(error => console.error(error))
})


module.exports = router