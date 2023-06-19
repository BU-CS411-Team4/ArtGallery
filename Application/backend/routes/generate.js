const express = require("express");
const router = express.Router();
const fetch = require("node-fetch");
const Replicate = require("replicate");
const fs = require('fs')

require('dotenv').config()

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});

// Image Generation
router.post("/", async (req, res, next) => {
  console.log(req.body.keyword);
  try {
    const artOutput = await replicate.run(
      "stability-ai/stable-diffusion:db21e45d3f7023abc2a46ee38a23973f6dce16bb082a930b0c49861f96d1e5bf",
      {
        input: {
          prompt: (req.body.keyword),
          image_dimensions: '512x512'
        },
      }
    );
    const musicOutput = await replicate.run(
      "riffusion/riffusion:8cf61ea6c56afd61d8f5b9ffd14d7c216c0a93844ce2d82ac1c9ecc9c7f24e05",
      {
        input: {
          prompt_a: JSON.stringify(req.body.keyword),
          denoising: 0.9,
          prompt_b: "classical music",
          alpha: 0.7
        }
      }
    );

    // Create an object with both outputs
    const output = {
      keyword: req.body.keyword,
      imageUrl: artOutput[0],
      audioUrl: musicOutput.audio
    };
    console.log(output)
    // Send the artOutput as the response.
    res.json(output);
  } catch (err) {
    console.error(err);
    res.status(500).send("An error occurred while processing your request.");
  }
});

router.post("/")

module.exports = router;
