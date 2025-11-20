const mongoose = require("mongoose")

mongoose.connect("mongodb://127.0.0.1:27017/artists-db")
.then(() => {
  console.log("connected the DB! :)")
})
.catch((error) => {
  console.log(error)
})