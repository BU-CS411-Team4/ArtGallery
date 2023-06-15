const mongoose = require('mongoose');

const artSchema = mongoose.Schema({
  keyword: {type: String, required: true},
  artFile: {type: String, required: true}
});

module.exports = mongoose.model('ArtSchema', artSchema);
