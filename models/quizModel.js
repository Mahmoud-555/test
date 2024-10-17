const mongoose = require("mongoose")
const schema = mongoose.Schema
var myschema = new schema({
  questions:[{
    type: mongoose.Schema.ObjectId,
    ref: 'question',
  }],
  type:String,
  creator:{
    type: mongoose.Schema.ObjectId,
    ref: 'user',
  },
  status:String,
  



}, { timestamps: true });



var Mymodel = mongoose.model('quiz', myschema,);
module.exports = Mymodel
