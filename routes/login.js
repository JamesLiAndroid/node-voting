module.exports = function(app) {
  app.get('/login', function(req, res) {
    console.log('进入登陆页面！')
    res.render('login')
  })
}
