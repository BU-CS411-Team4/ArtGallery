const express = require("express");
const ArtSchema = require("../models/art");
const router = express.Router();
const downloadFile = require('../utils/downloadFile');
const fs = require('fs');
const path = require('path');
const appDir = path.dirname(require.main.filename);

router.post("/saveArt", async (req,res) => {
  const output = req.body.output;

  // Download the files using the URLs in the output object.
  const imagePath = await downloadFile(output.imageUrl, `${output.keyword}.jpg`);
  const audioPath = await downloadFile(output.audioUrl, `${output.keyword}.wav`);

  const art = new ArtSchema({
    keyword: output.keyword,
    imagePath,
    audioPath,
    userId: req.body.user._id
  });

  art.save().then(createdArt => {
    res.status(200).json({
      message: 'Post added successfully',
      art: {
        id: createdArt._id,
        keyword: createdArt.keyword,
        imagePath: createdArt.imagePath,
        audioPath: createdArt.audioPath,
        user_Id: createdArt.userId
      }
    });
  });
});

router.post("/getArt", (req,res,next) => {
  ArtSchema.find({userId: req.body.user._id})
    .then(documents => {
      res.status(200).json({
        message: 'Art fetched successfully',
        arts: documents
      });
    });
})


router.delete("/:id", (req,res,next) => {
  ArtSchema.findOneAndDelete({_id: req.params.id})
    .then(doc => {
      try {
        const imagePath = path.join(appDir, doc.imagePath.replace('http://localhost:3000', 'backend')); // convert URL to local path
        const audioPath = path.join(appDir, doc.audioPath.replace('http://localhost:3000', 'backend'));
        fs.unlinkSync(imagePath);
        fs.unlinkSync(audioPath);
        console.log(`Successfully deleted files`);
        res.status(200).json({message: "Art deleted!"});
      } catch (err) {
        console.error(`Error deleting file:`, err);
        res.status(500).json({message: "Error in deleting files"});
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({message: "Error in deletion"});
    });
});

module.exports = router;
