const express = require('express')
const router = express.Router()
const Record = require('../../models/record')

router.get('/', (req, res) => {
  const userId = req.user._id
  
  return Record.find({ userId })
    .lean()
    .then(records => {
      records = records.map( record => {
        record.date = new Date(record.date).toLocaleDateString()
        return record
      })
      res.render('index', { records })
    })
    .catch(error => console.error(error))
})

module.exports = router