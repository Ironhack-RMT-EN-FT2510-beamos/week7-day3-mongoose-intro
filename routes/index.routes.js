const express = require("express")
const router = express.Router()

// router is an object that holds many routes and allows us to pass it to other parent files

router.get("/", (req, res, next) => {
  res.status(200).json({ message: "all good here!" })
})


router.get("/potatoes/:potatoId", (req, res) => {
  console.log("req.body", req.body)
  console.log("req.params", req.params)
  console.log("req.query", req.query)
  res.status(200).send("accesing /potatoes, all good")
})


const artistRouter = require("./artist.routes")
router.use("/artist", artistRouter)

const songRouter = require("./song.routes")
router.use("/song", songRouter)

module.exports = router