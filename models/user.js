const mongoose = require('mongoose')
const Schema = mongoose.Schema
const autoIncrement = require('mongoose-auto-increment')

const userSchema = new Schema({
  name:{
    type: String,
    required: true  
  },
  id: {
    type: Number
  }
})

userSchema.plugin(autoIncrement.plugin, {
  model: 'User',
  field: 'id',
  startAt: 1,
  incrementBy: 1
})

module.exports = mongoose.model('User', userSchema)