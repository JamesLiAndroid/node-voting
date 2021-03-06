module.exports = function(app) {
  app.get('/cart', function(req, res) {
    if(!req.session.user) {
      req.session.error = '请先登陆'
      res.redirect('/login')
    }

    var Cart = global.dbHelper.getModel('cart')
    Cart.find({
      "uId":req.session.user._id,
      "cStatus":false
    }, function(error, docs) {
      console.log('查询的id'+req.session.user._id+'查询的数据为：'+docs)
        if(error) {
          req.session.error = '查询数据出错'
          res.sendStatus(404)
        }
        res.render('cart', {carts:docs})
      }
    )
  })

  app.get('/addToCart/:id', function(req, res) {
    if(!req.session.user) {
      req.session.error = '请先登陆'
      res.redirect('/login')
      return
    }
    var productId = req.params.id
    var Carts = global.dbHelper.getModel('cart')
    var Commodity = global.dbHelper.getModel('commodity')

    Carts.findOne({
      'cId':productId
    }, function(error, doc) {
      // 查询结果不为空，说明商品存在
      // 进行update
      // 否则重新向购物车添加
      if(error) {
        req.session.error = '查询商品不成功'
        res.sendStatus(404)
      }

      if(doc) {
        var cQuantity
        if(!doc.cQuantity) {
          cQuantity = 1
        } else {
          cQuantity = doc.cQuantity
        }
        console.log('查询商品的数据为：'+doc)
        Carts.update({
          'uId': req.session.user._id,
          'cId': productId
        }, {
          $set: {
            cQuantity: cQuantity + 1
          }
        }, function(error) {
          if(error) {
            req.session.error = '更新失败'
            res.sendStatus(404)
          } else {
            req.session.error = '更新成功'
            //res.sendStatus(200)
            res.redirect('/home')
          }
        })
      } else {
        Commodity.findOne({
          "_id": productId
        }, function (error, doc) {
          console.log('获取的商品信息为：'+doc)
          Carts.create({
            uId: req.session.user._id,
            cId: productId,
            cName: doc.name,
            cPrice: doc.price,
            cImgSrc: doc.imgSrc,
            cQuantity : 1
        },function(error,doc){
          if(error) {
            req.session.error = '数据插入购物车失败'
            res.sendStatus(404)
          }
          if(doc){
            console.log('插入购物车成功！')
            req.session.error = '插入购物车成功'
            res.redirect('/home')
          } else {
            console.log('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
          }
        })

      })
    }

    })

  })

  app.post('/cartall', function(req, res) {
    console.log('req。body`' + req.body.toString())
    var Carts = global.dbHelper.getModel('cart')
    Carts.update({
      '_id': req.body.cId
    }, {
      $set: {
        cQuantity: req.body.cnum,
        cStatus: true
      }
    }, function(error,doc) {
      if(error) {
        req.session.error = '购物车结算失败！'
        res.sendStatus(403)
        return
      }

      console.log('更新购物车数据：'+doc)
      if(doc) {
        console.log('结算成功')
        req.session.error = '数据更新成功！'
        res.sendStatus(200)
      }
    })
  })

  app.get('/delFromCart/:id', function(req, res) {
    console.log('接收删除数据的请求！')
    var id = req.params.id
    var Carts = global.dbHelper.getModel('cart')
    Carts.remove({
      '_id': id
    }, function(error, doc) {
      console.log('删除的数据为：'+doc)
      if(error) {
        console.log('删除数据失败')
        req.session.error = '删除数据失败'
        res.sendStatus(404)
        return
      }
      if(doc > 0) {
        console.log('删除数据成功')
        //res.sendStatus(200)
        res.redirect('/cart')
      }
    })
  })
}
