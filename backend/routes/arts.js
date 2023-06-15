const express = require("express");
const ArtSchema = require("../models/art");
const mongoose = require("mongoose");

const router = express.Router();

router.post("", (req,res,next) => {
  const art = new ArtSchema({
    keyword: req.body.keyword,
    artFile: req.body.artFile
  });
  art.save().then(createdArt => {
    res.status(201).json({
      message: 'Post added successfully',
      artId: createdArt._id
    });
  });
})

router.get("", (req,res,next) => {
  ArtSchema.find()
    .then(documents => {
      res.status(200).json({
        message: 'Post fetched successfully',
        arts: documents
      });
    });
})

router.delete("/:id", (req,res,next) => {
  ArtSchema.deleteOne({_id: req.params.id}).then(result => {
    console.log(result);
    res.status(200).json({message: "Art deleted!"});
  })
});

module.exports = router;
