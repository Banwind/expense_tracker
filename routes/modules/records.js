const express = require('express')
const router = express.Router()
const Records = require('../../models/record')
const Category = require('../../models/category');

// 前往新增的頁面
router.get('/new', async (req, res) => {
  const categories = await Category.find().lean()
  return res.render('new', { categories })
})

// 接住新增的資料
router.post('/', (req, res) => {
  const userId = req.user._id
  const Record = new Records({ ...req.body, userId })
  Record.save((err) => {
    if (err) {
      console.error(err)
      return res.status(500).send('Failed to add record')
    }
    return res.redirect('../')
  })
})

// 進入修改頁面，將原有資料傳入edit
router.get('/:id/edit', async(req, res) => {
  const userId = req.user._id
  const _id = req.params.id

  const record = await Records.findOne({ _id, userId })
    .populate({ path: 'categoryId', model: 'Category' })
    .lean()

  record.date = record.date.toISOString().split('T')[0];

  const category = await Category.find().lean()

  return res.render('edit', { record, category })
})

// 將修改完的資訊回傳回資料庫並更新
router.put('/:id', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  Records.findOne({ userId, _id })
    .then((record) => {
      if (!record) {
        return res.status(404).send('Record not found')
      }
      return Records.findByIdAndUpdate( _id, req.body)
    })
    .then(()=> res.redirect('/'))
    .catch(error => console.log(error))
})

// 刪除資料
router.delete('/:id', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  Records.findOne({ _id, userId })
    .then((record) => {
      if (!record) {
        return res.status(404).send('Record not found')
      }
      return Records.findByIdAndDelete(_id)
    })
    .then(() => res.redirect('../'))
    .catch(error => console.log(error))    
})

module.exports = router