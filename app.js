const express = require('express')
const session = require('express-session')
const usePassport = require('./config/passport') // 載入設定檔，要寫在 express-session 以後
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')// 引用 body-parser
const methodOverride = require('method-override')
const routes = require('./routes') // 引用路由器
const flash = require('connect-flash')
const app = express()

