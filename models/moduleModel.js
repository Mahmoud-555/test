const mongoose = require("mongoose")
const schema = mongoose.Schema
var myschema = new schema({
  module: { type: String, trim: true },
  moduleImage: String,
  subject: {
    type: mongoose.Schema.ObjectId,
    ref: 'subject',
    required: [true, 'module must be belong to subject'],
  },

  type: { type: String, trim: true, default: "academy" },



}, { timestamps: true });






var Mymodel = mongoose.model('Module', myschema);
module.exports = Mymodel