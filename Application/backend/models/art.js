const mongoose = require('mongoose');

const ArtSchema = mongoose.Schema({
  keyword: { type: String, required: true },
  imagePath: { type: String, required: true },
  audioPath: { type: String, required: true }
});

module.exports = mongoose.model('ArtSchema', ArtSchema);
