import mongoose from "mongoose";


mongoose.connect("mongodb://localhost:27017")


const db = mongoose.connection
db.on("open", () => {
  console.log("DB Connection is successful");

})

db.on("error", () => {
  console.log("DB Connection is Failed");

})








