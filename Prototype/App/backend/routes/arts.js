const express = require("express");
const ArtSchema = require("../models/art");
const multer = require("multer")

const router = express.Router();

const MIME_TYPE_MAP = {
  'image/png': 'png',
  'image/jpeg': 'jpg',
  'image/jpg': 'jpg'
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const isValid = MIME_TYPE_MAP[file.mimetype];
    let error = new Error("Invalid mime type");
    if(isValid){
      error = null;
    }
    cb(null, "backend/images")
  },
  filename: (req, file, cb) => {
    const name = file.req.body.keyword.toLowerCase().split(' ').join('-');
    const ext = MIME_TYPE_MAP[file.mimetype];
    cb(null, name + '-' + Date.now() + '.' + ext);
  }
});

router.post("", multer({storage: storage}).single("image"), (req,res,next) => {
  const url = req.protocol + '://' + req.get("host");
  const art = new ArtSchema({
    keyword: req.body.keyword,
    image: req.body.image,
    imagePath: url + "/images/" + req.file.filename
  });
  art.save().then(createdArt => {
    res.status(201).json({
      message: 'Post added successfully',
      art: {
        id: createdArt._id,
        keyword: createdArt.keyword,
        imagePath: createdArt.imagePath
      }
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
