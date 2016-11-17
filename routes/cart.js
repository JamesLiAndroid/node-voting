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
        req.sendStatus(404)
      }

      if(doc) {
        console.log('查询商品的数据为：'+doc)
        Carts.update({
          'uId': req.session.user._id,
          'cId': productId
        }, {
          $set: {
            cQuantity: doc.cQuantity + 1
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
            res.session.error = '插入购物车成功'
            res.redirect('/home')
          } else {
            console.log('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
          }
        })

      })
    }

    })

  })
}
