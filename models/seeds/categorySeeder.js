const bcrypt = require('bcryptjs')
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const db = require('../../config/mongoose')
const category = require('../category')

const categories = [家居物業,交通出行,休閒娛樂,餐飲食品,其他]

db.once('open', async () => {
  try {
    for (let i=0; i<categories.length; i++){
      await category.create({name: categories[i]})
    }

    db.close()
  } catch (err) {
    console.log(err)
  }
})