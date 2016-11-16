module.exports = function(app) {
  app.get('/home', function(req, res) {
    if(req.session.user) {
      var Commodity = global.dbHelper.getModel('commodity')
      Commodity.find({}, function(error, docs) {
        console.log('查询的数据为：'+docs)
        res.render('home', {Commoditys: docs})
      })
    } else {
      req.session.error = '请先登陆'
      res.redirect('/login')
    }
  })
}
