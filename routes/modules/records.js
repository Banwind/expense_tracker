const express = require('express')
const router = express.Router()
const Records = require('../../models/record')
const Category = require('../../models/category');

// 前往新增的頁面
router.get('/new', (req, res) => {
  return res.render('new')
})

// 接住新增的資料
router.post('/', (req, res) => {
  const userId = req.user._id
  const Record = new Records({ ...req.body, userId })
  Record.save((err) => {
    if (err) {
      console.error(err)
      return res.status(500).send('Failed to add restaurant')
    }
    return res.redirect('/')
  })
})

// 進入修改頁面，將原有資料傳入edit
router.get('/:id/edit', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  return Records.findOne({ _id, userId })
    .lean()
    .then((record) => {
      Category.findById(record.categoryId).then((category) => {
        record.category = category.name;
        res.render('edit', { record })
      })
    })
    .catch(error => console.error(error))
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
    .then(()=> res.redirect(`/restaurants/${_id}`))
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
      return Records.findByIdAndUpdate(id)
    })
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))    
})

module.exports = router