try {
  process.loadEnvFile()
} catch (error) {
  console.warn("no .env file, using default variables")
}

const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const mongoose = require("mongoose")

mongoose.connect("mongodb://127.0.0.1:27017/artists-db")
.then(() => {
  console.log("connected the DB! :)")
})
.catch((error) => {
  console.log(error)
})

const app = express();

// all middlewares & configurations here
app.use(logger("dev"));
app.use(express.static("public"));

// to allow CORS access from anywhere
app.use(cors({
  origin: '*'
}));

// below two configurations will help express routes at correctly receiving data. 
app.use(express.json()); // recognize an incoming Request Object as a JSON Object
app.use(express.urlencoded({ extended: false })); // recognize an incoming Request Object as a string or array

// all routes here...
app.get("/", (req, res, next) => {
  res.json({ message: "all good here!" })
})


app.get("/potatoes/:potatoId", (req, res) => {
  console.log("req.body", req.body)
  console.log("req.params", req.params)
  console.log("req.query", req.query)
  res.send("accesing /potatoes, all good")
})


//* Routes for the Artists
const Artist = require("./models/artist.model")

app.post("/artist", (req, res) => {
  console.log(req.body)

  Artist.create({
    name: req.body.name,
    awardsWon: req.body.awardsWon,
    isTouring: req.body.isTouring,
    genre: req.body.genre
  })
  .then(() => {
    res.send("new artist was created")
  })
  .catch((error) => {
    console.log(error)
  })
})

app.get("/artist", (req, res) => {

  console.log(req.query)

  Artist.find(req.query)
  .then((response) => {
    res.json(response)
  })
  .catch((error) => {
    console.log(error)
  })

})


// put functionality
app.put("/artist/:artistId", (req, res) => {

  console.log(req.params)
  console.log(req.body)

  Artist.findByIdAndUpdate(req.params.artistId, {
    name: req.body.name,
    awardsWon: req.body.awardsWon,
    isTouring: req.body.isTouring,
    genre: req.body.genre,
  })
  .then(() => {
    res.send("all good, artist updated")
  })
  .catch((error) => {
    console.log(error)
  })
})

// delete functionality
app.delete("/artist/:artistId", async (req, res) => {

  console.log(req.params)

  try {
    
    await Artist.findByIdAndDelete(req.params.artistId)
    res.send("artist deleted")

  } catch (error) {
    console.log(error)
  }

})


// server listen & PORT
const PORT = process.env.PORT || 5005

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
