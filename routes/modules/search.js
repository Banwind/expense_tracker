const express = require('express')
const router = express.Router()
const Record = require('../../models/record')
const Category = require('../../models/category')

router.get('/:category?', async (req, res) => {
  const userId = req.user._id
  const { category: categoryEnName } = req.params

  let filter = { userId }
  if (categoryEnName) {
    const category = await Category.findOne({ name_en: categoryEnName }).lean()
    filter.category = category._id
  }

  Record.find(filter)
    .populate('category')
    .lean()
    .then(records => {
      const totalAmount = records.reduce((sum, record) => sum + record.amount, 0)
      res.render('index', { records, totalAmount })
    })
    .catch(error => console.error(error))
})

module.exports = router