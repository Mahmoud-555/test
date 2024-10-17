const mongoose = require("mongoose")
const schema = mongoose.Schema
var myschema = new schema({

    question: { type: String, required: [true, "question is requird"], unique: true },
    answers: Array,
    correct: Array,
    subject: String,



    level: String,
    images: Array,
    lecture: {
        type: mongoose.Schema.ObjectId,
        ref: 'lecture',
        required: [true, 'Product must be belong to category'],
      },
    module:{
        type: mongoose.Schema.ObjectId,
        ref: 'module',
        required: [true, 'question must be belong to mo'],
      }
}, { timestamps: true });



var Mymodel = mongoose.model('question', myschema,);
module.exports = Mymodel
