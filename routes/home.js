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

  app.get('/addcommodity',function(req, res) {
    res.render('addcommodity')
  })

  app.post('/addcommodity', function(req, res) {
    var Commodity = global.dbHelper.getModel('commodity')
    Commodity.create({
      name: req.body.name,
      price: req.body.price,
      imgSrc: req.body.imgSrc
    }, function(error, doc) {
      console.log('创建的数据为:'+doc)
      if(error) {
        res.sendStatus(404)
      }
      if(doc) {
        res.sendStatus(200)
        console.log('插入成功')
      } else {
        res.sendStatus(404)
      }
    })
  })
}
