const bcryptUtil = require('../../utils/bcryptUtil')
const db = require('../../config/mongoose')
const record = require('../record')
const user = require('../user')
const categories = require('../category')

const users = {
  name: "小新",
  password: "123456" 
}
const records = [
  { name: "電費", date: "2023/03/01", amount: 3000, category: "家居物業", user: "小新"},
  { name: "火車票", date: "2023/03/02", amount: 350, category: "交通出行", user: "小新"},
  { name: "星際異攻隊電影票", date: "2023/05/03", amount: 250, category: "休閒娛樂", user: "小新" },
  { name: "珍珠奶茶", date: "2023/03/04", amount: 55, category: "餐飲食品", user: "小新" },
  { name: "婚禮紅包", date: "2023/03/25", amount: 6000, category: "其他", user: "小新" },
];

db.once('open', async () => {
  try {
    users.password = await bcryptUtil.hashPassword(users.password)
    await user.create({...users})

    const categoryPromises = records.map(record => categories.findOne({ name: record.category }));
    const userPromises = records.map(record => user.findOne({ name: record.user }));

    const categoriesAndUsers = await Promise.all([Promise.all(categoryPromises), Promise.all(userPromises)]);

    for (let i = 0; i < records.length; i++) {
      await record.create({ ...records[i], categoryId: categoriesAndUsers[0][i]._id, userId: categoriesAndUsers[1][i]._id });
    }

    console.log('record seeder DONE!')
    db.close()
  } catch (err) {
    console.log(err)
  }
})