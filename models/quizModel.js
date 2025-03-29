const mongoose = require("mongoose")
const schema = mongoose.Schema
var myschema = new schema({
  questions: [{
    type: mongoose.Schema.ObjectId,
    ref: 'question',
  }],
  type: String,
  creator: {
    type: mongoose.Schema.ObjectId,
    ref: 'user',
    required: true
  },
  status: {
    type: String,
    enum: ['active', 'inactive'], // Example types
    default: 'active'
  },
  name: String,
  startAt: {
    type: Date
  },
  currentIndex: {
    type: Number,
    default: 0
  },
  questionStartedAt: {
    type: Date
  },
  participants: [{
    type: mongoose.Schema.ObjectId,
    ref: 'user',
  }],
  usersAnswers: {
    type: Object,
    default: {}
  },
  rank: {
    type: Array,
    default: []
  },
  scores: {
    type: Object,
    default: {}
  }





}, { timestamps: true });

var Mymodel = mongoose.model('quiz', myschema,);
module.exports = Mymodel
