module.exports = function(app) {
  require('./register')(app)
  require('./login')(app)
  require('./home.js')(app)
  require('./cart.js')(app)
  require('./remove.js')(app)
}
