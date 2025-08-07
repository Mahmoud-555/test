const mongoose = require("mongoose")
const schema = mongoose.Schema
var myschema = new schema({
    subject: { type: String, trim: true },
    subjectImage: String,
    // moduleIds:{
    //     type: mongoose.Schema.ObjectId,
    //     ref: 'module',
    //   },
    type: { type: String, trim: true, default: "academy" },

}, { timestamps: true });






var Mymodel = mongoose.model('subject', myschema);
module.exports = Mymodel