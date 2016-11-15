module.exports = function(app) {
  app.get('/login', function(req, res) {
    console.log('进入登陆页面！')
    res.render('login')
  })

  app.post('/login', function(req, res) {
    var User = global.dbHelper.getModel('user')
    var uname = req.body.username

    User.find({
      name: uname
    },{
      name: 1,
      passord: 1,
      _id: 0
    }, function(error, doc) {
      if(error) {
        console.log(uname + '用户不存在:'+error)
        req.session.error = '用户不存在'
        res.sendStatus(404)
      } else if(doc.password !== req.body.password) {
        console.log('密码错误！' + doc)
        req.session.error = '密码错误！'
        res.sendStatus(404)
      } else {
        console.log('登陆成功！' + doc)
        res.session.user = doc
        res.sendStatus(200)
      }
    })
  })
}
