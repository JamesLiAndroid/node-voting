module.exports = function(app) {
  require('./register')(app)
  require('./login.js')(app)
}
