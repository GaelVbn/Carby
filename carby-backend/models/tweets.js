const mongoose = require('mongoose');

const tweetSchema = mongoose.Schema({
  author: String,
  photoProfile: String,
  content: String,
  createdAt: Date,
});

const Tweet = mongoose.model('tweets', tweetSchema);

module.exports = Tweet;
