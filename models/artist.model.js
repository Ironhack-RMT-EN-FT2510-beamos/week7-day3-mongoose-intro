const mongoose = require("mongoose")

// Schema
const artistSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  awardsWon: {
    type: Number,
    min: 0
  },
  isTouring: Boolean,
  genre: {
    type: [String],
    enum: ["rock", "indie", "alternative", "grunge", "metal", "jazz", "country"]
  },
  favOtherArtist: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Artist"
  }
})

// Model
const Artist = mongoose.model("Artist", artistSchema)
// 1. name of the model, always singular, single word, Capitalized.
// 2. schema we just created

module.exports = Artist