module.exports = function(app) {
  app.get('/cart', function(req, res) {
    if(!req.session.user) {
      req.session.error = '请先登陆'
      req.redirect('/login')
    }

    var Cart = global.dbHelper.getModel('cart')
    Cart.find({"uId": })
  })
}
