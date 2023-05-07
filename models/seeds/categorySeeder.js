const db = require('../../config/mongoose')
const category = require('../category')

const categories = [
  {
    "name": "家居物業",
    "name_en": "property",
    "icon": "https://fontawesome.com/icons/home?style=solid"
  },
  {
    "name": "交通出行",
    "name_en": "transportation",
    "icon": "https://fontawesome.com/icons/shuttle-van?style=solid"
  },
  {
    "name": "休閒娛樂",
    "name_en": "entertainment",
    "icon": "https://fontawesome.com/icons/face-grin-beam?style=solid"
  },
  {
    "name": "餐飲食品",
    "name_en": "food",
    "icon": "https://fontawesome.com/icons/utensils?style=solid"
  },
  {
    "name": "其他",
    "name_en": "others",
    "icon": "https://fontawesome.com/icons/pen?style=solid"
  }
]

db.once('open', async () => {
  try {
    for (let i=0; i<categories.length; i++){
      await category.create({...categories[i]})
    }

    db.close()
    console.log('category seeder DONE!')
  } catch (err) {
    console.log(err)
  }
})