const mongoose = require("mongoose");

require("dotenv").config();

const url = process.env.MONGODB_URI_DEV;

mongoose.connect(url, (err) => {
  if (err) console.log(err);
  else console.log("mongodb is connected");
});

const Person = mongoose.model("Person", {
  name: String,
  number: String,
});

module.exports = Person;
