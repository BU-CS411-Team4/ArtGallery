const express = require("express");
const router = express.Router();
const fetch = require("node-fetch")

router.post("/", (req, res, next) => {
  console.log(req.body.keyword)
  fetch(
    "https://api-inference.huggingface.co/models/runwayml/stable-diffusion-v1-5",
    {
      headers: { Authorization: "Bearer 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" },
      method: "POST",
      body: JSON.stringify(req.body.keyword + ' art'),
    }
  )
    .then(response => response.arrayBuffer())
    .then(arrayBuffer => {
      const buffer = Buffer.from(arrayBuffer);
      res.setHeader('Content-Type', 'image/jpeg');
      res.send(buffer);
    })
    .catch(error => console.error(error));
});

module.exports = router;
