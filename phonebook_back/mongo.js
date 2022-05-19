const mongoose = require("mongoose");
const { mongourl } = require("./mongourl");

const url = mongourl;

mongoose.connect(url);

const Person = mongoose.model("Person", {
  name: String,
  number: String,
});

const person = new Person({
  name: "Arto Hellas",
  number: "040-123345",
});

person2.save().then((response) => {
  console.log("person saved!");
  mongoose.connection.close();
});
