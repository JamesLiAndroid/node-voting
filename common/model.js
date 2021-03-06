module.exports = {
  user:{
    name:{ type: String, required: true },
    password:{ type: String, required: true },
    gender:{ type: Boolean, default: true }
  },
  commodity: {
    name: String,
    price: Number,
    imgSrc: String
  },
  cart: {
    uId: {type: String},
    cId: {type: String},
    cName: {type: String},
    cPrice: {type: String},
    cImgSrc: {type: String},
    cQuantity: {type: Number},
    cStatus: {type: Boolean, default: false}
  }
}
