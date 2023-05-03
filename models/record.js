const mongoose = require('mongoose')
const Schema = mongoose.Schema
const autoIncrement = require('mongoose-auto-increment')

const recordSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    index: true,
    required: true
  },
  categoryId: {
    type: Schema.Types.ObjectId,
    ref: 'Category',
    index: true,
    required: true
  },
  id: {
    type: Number
  }
})

recordSchema.plugin(autoIncrement.plugin, {
  model: 'Record',
  field: 'id',
  startAt: 1,
  incrementBy: 1
})

module.exports = mongoose.model('Record', recordSchema)