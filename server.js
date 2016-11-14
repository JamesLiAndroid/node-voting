var express = require('express')
var ejs = require('ejs')
var path = require('path')
var mongoose = require('mongoose')

var bodyParser = require('body-parser')
var multer = require('multer')
var session = require('express-session')

// 初始化变量
var app = express()

// 连接数据库
mongoose.connect("mongodb://127.0.0.1:27017/simple-store")

// express-session deprecated undefined resave option; provide resave option server.js:16:9
// express-session deprecated undefined saveUninitialized option; provide saveUninitialized option server.js:16:9
app.use(session({
  resave:false,//添加这行
  saveUninitialized: true,//添加这行
  secret: 'secret',
  cookie: {
    maxAge: 1000*60*60
  }
}))

// 使用global定义全局变量，可在任何模块内调用
global.dbHelper = require('./common/dbHelper')

// 使用engine函数注册模板引擎并指定处理后缀名称为html的文件
app.set('view engine', 'html')
app.engine('.html', ejs.__express)

// 设定视图存放的目录
app.set('views', path.join(__dirname, 'views'))
// 指定本地静态资源的访问路径,app.use而不是app.set
app.use(express.static(path.join(__dirname, 'public')))


// 调用中间件
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(multer())

// 设置返回信息
app.use(function(req, res, next) {
  res.locals.user = req.session.user // 保存用户信息
  var err = req.session.error // 保存结果响应信息
  res.locals.message = '' // 保存的html标签，在模板中引用而显示的内容
  if(err) res.locals.message = '<div class="alert alert-danger" style="margin-bottom: 20px;color: red;">' + err + '</div>'
  next()
})

// 将app传入路由
require('./routes')(app)

/*app.get('/', function(req, res) {
  res.render('register')
})
*/

app.listen(10086)
