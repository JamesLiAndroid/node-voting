var mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  models = require('./model.js')

for(var m in models) {
  mongoose.model(m, new Schema(models[m]))
}

var __getModel = function(type) {
  return mongoose.model(type)
}

module.exports = {
  getModel: function(type) {
    return __getModel(type)
  }
}
