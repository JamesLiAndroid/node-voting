//var bodyParser = require('body-parser')
//var multer = require('multer')
//var session = require('express-session')

module.exports = function (app){
  //app.use(bodyParser.json())
  //app.use(bodyParser.urlencoded({ extended:true }))
  //app.use(multer())

  app.get('/register', function(req, res) {
    res.render('register')
  })

  app.post('/register', function (req, res) {
    console.log(req.body)
    var User = global.dbHelper.getModel('user')
    var uname = req.body.username

    User.findOne({
      name: uname
    }, function (error, doc) {
      if(doc) {
        console.log('用户名已经存在！')
        req.session.error = '用户名已经存在！'
        res.sendStatus(500)
      } else {
        console.log('正在创建。。。')
        User.create({
          name: uname,
          password: req.body.password
        }, function (error,doc) {
          if(error) {
            console.log('创建失败！')
            res.sendStatus(500)
          } else {
            console.log('创建成功！'  +doc)
            req.session.error = '用户名创建成功！'
            //res.sendStatus(200)
            res.set('Content-Type', 'application/json')
            res.status(200).send('{status:ok}')
          }
        })
      }
    })

  })
}
