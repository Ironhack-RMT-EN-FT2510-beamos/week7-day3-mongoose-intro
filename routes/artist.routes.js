const express = require("express")
const router = express.Router()

//* Routes for the Artists
const Artist = require("../models/artist.model");


router.post("/", (req, res) => {
  console.log(req.body)

  Artist.create({
    name: req.body.name,
    awardsWon: req.body.awardsWon,
    isTouring: req.body.isTouring,
    genre: req.body.genre,
    favOtherArtist: req.body.favOtherArtist
  })
  .then(() => {
    res.sendStatus(201)
    // .status() attach a code to a message. Message is mandatory.
    // .sendStatus() just send the status, no meesage needed.
  })
  .catch((error) => {
    console.log(error)
  })
})

router.get("/", (req, res, next) => {

  console.log(req.query)

  Artist.find(req.query)
  // .select({name: 1, awardsWon: 1}).sort({awardsWon: 1}).limit(2)
  .then((response) => {
    res.status(200).json(response)
  })
  .catch((error) => {
    next(error)
  })

})

router.put("/:artistId", (req, res) => {

  console.log(req.params)
  console.log(req.body)

  Artist.findByIdAndUpdate(req.params.artistId, {
    name: req.body.name,
    awardsWon: req.body.awardsWon,
    isTouring: req.body.isTouring,
    genre: req.body.genre,
  })
  .then(() => {
    res.sendStatus(202)
  })
  .catch((error) => {
    console.log(error)
  })
})

router.delete("/:artistId", async (req, res) => {

  console.log(req.params)

  try {
    
    await Artist.findByIdAndDelete(req.params.artistId)
    res.sendStatus(202)

  } catch (error) {
    console.log(error)
  }

})

module.exports = router