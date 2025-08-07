const mongoose = require("mongoose")
const schema = mongoose.Schema
var myschema = new schema({
    lecture: { type: String, trim: true },
    lectureImage: String,
    questionNum: Number,
    subject: {
        type: mongoose.Schema.ObjectId,
        ref: 'subject',
        
    },
    module: {
        type: mongoose.Schema.ObjectId,
        ref: 'module',
        
    },
    description: String


}, { timestamps: true });






var Mymodel = mongoose.model('lecture', myschema);
module.exports = Mymodel