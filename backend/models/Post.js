const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: String,
  details: String,
  imageSrc: String,
  imageAlt: String,
  date: String,
  tags: [String],
  isDeleted: {
    type: Boolean,
    default: false
  },
  deletedAt: {
    type: Date,
    default: null
  },
 
});

module.exports = mongoose.model('Post', postSchema);
