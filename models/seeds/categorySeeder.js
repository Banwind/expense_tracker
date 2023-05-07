const db = require('../../config/mongoose')
const category = require('../category')
const categoryJSON = require('./category.json').results

db.once('open', async () => {
  try {
    for (let i=0; i<categoryJSON.length; i++){
      await category.create({...categoryJSON[i]})
    }

    db.close()
    console.log('category seeder DONE!')
  } catch (err) {
    console.log(err)
  }
})