const mongoose = require('mongoose');

const ArtSchema = mongoose.Schema({
  keyword: { type: String, required: true },
  imagePath: { type: String, required: true },
  audioPath: { type: String, required: true },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
});

module.exports = mongoose.model('ArtSchema', ArtSchema);
