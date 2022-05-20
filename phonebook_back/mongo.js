const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

var name = process.argv[2];
var number = process.argv[3];

mongoose.connect(process.env.MONGODB_URI, (err) => {
  if (err) console.log(err);
  else console.log("mongdb is connected");
});

const Person = mongoose.model("Person", {
  name: String,
  number: String,
});

if (name && number) {
  const person = new Person({
    name: name,
    number: number,
  });
  person.save().then((response) => {
    console.log("person saved!", response);
    mongoose.connection.close();
  });
} else {
  Person.find({}).then((result) => {
    console.log("Phonebook:");
    result.forEach((person) => {
      console.log(person.name, person.number);
    });
    mongoose.connection.close();
  });
}
