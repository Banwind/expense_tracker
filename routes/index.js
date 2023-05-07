const express = require('express') // 引用 Express 與 Express 路由器
const router = express.Router() // 準備引入路由模組

const home = require('./modules/home') // 引入 home 模組程式碼
const records = require('./modules/records')
const users = require('./modules/users')
const auth = require('./modules/auth')
const search = require('./modules/search')

const { authenticator } = require('../middleware/auth') // 進到路由之前需要先通過auth檢查是否登入
console.log('route')
//!!!!!!!!!!!!注意先後順序!!!!!!!!!!!!!!
router.use('/auth', auth) // 檢查使用者是否登入
router.use('/users', users) // 登入或是註冊頁面
router.use('/search', authenticator, search) // 類別搜尋
router.use('/records', authenticator, records) // 加入新資料或是更正舊資料
router.use('/', authenticator, home)// 導進支出首頁
console.log('route end')
module.exports = router// 匯出路由器