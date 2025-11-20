const express = require("express")
const router = express.Router()

// Routes for Songs
const Song = require("../models/song.model");

router.post("/", async(req, res, next) => {

  try {
    
   await Song.create({
      title: req.body.title,
      releaseDate: req.body.releaseDate,
      artist: req.body.artist,
      collaboratingArtists: req.body.collaboratingArtists
    })

    res.sendStatus(201)

  } catch (error) {
    next(error)
  }

})

router.get("/random", () => {
  // logic for finding a random song
  //* always before the dynamic routes
})

router.get("/:songId", async (req, res) => {

  try {
    
    const responseSong = await Song
    .findById(req.params.songId)
    // .populate("artist", {name: 1})
    // .populate("artist", "name isTouring")
    .populate({
      path: "artist",
      select: {name: 1, isTouring: 1}
    })

    // const responseArtist = await Artist.findById(responseSong.artist)

    res.status(200).json(responseSong)

  } catch (error) {
    console.log(error)
  }

})

router.get("/", async (req, res, next) => {

  try {

    console.log(potato) // example of my route breaking
    
    const responseSong = await Song
    .find()
    .populate("artist")
    .populate({
      path: "collaboratingArtists",
      populate: {
        path: "favOtherArtist",
      }
    })

    res.status(200).json(responseSong)

  } catch (error) {
    // next() => if we don't add anything in the parenthesis, continue checking the next routes and go into one that matches the URL. mostly use for middlewares.
    // if we add something inside the parenthesis, move to the 500 error handler.
    next(error)
  }

})



module.exports = router