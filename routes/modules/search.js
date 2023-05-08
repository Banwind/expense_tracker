const express = require('express')
const router = express.Router()
const Record = require('../../models/record')
const categoryModel = require('../../models/category')

router.get('/:category?', async (req, res, next) => {
  const userId = req.user._id
  let categoryId = req.params.category

  try {
    const category = await categoryModel.findOne({ name_en: categoryId }).lean();

    if (category) {
      categoryId = category._id;
    
      Record.find({ userId, categoryId })
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
    } else {
      res.redirect('/')
    }
  } catch (error) {
    // 捕獲查詢過程中可能出現的錯誤
    console.error(error)
  }

})

module.exports = router