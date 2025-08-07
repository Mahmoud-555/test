const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// const User = require('./userModel'); // Import User model to register schema

const reactionSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'user', required: true },
  type: { type: String, enum: ['like', 'love', 'haha', 'wow', 'sad', 'angry'], required: true }
});

const commentSchema = new Schema({
  author: { type: Schema.Types.ObjectId, ref: 'user', required: true },
  content: { type: String, required: true },
  reactions: [reactionSchema],
  replies: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
  ancestors: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
  createdAt: { type: Date, default: Date.now }
});

const Comment = mongoose.model('Comment', commentSchema);

const postSchema = new Schema({
  author: { type: Schema.Types.ObjectId, ref: 'user', required: true },
  content: { type: String, required: true },
  images: [{ type: String }], // URLs or paths to images
  videos: [{ type: String }], // URLs or paths to videos
  privacy: { type: String, enum: ['Public', 'Friends', 'Only Me'], default: 'Public' },
  comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
  likes: [{ type: Schema.Types.ObjectId, ref: 'user' }], // Array of user IDs who liked the post
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Post', postSchema);
