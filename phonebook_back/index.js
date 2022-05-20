const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const Person = require("./models/person");
const { response } = require("express");

app.use(express.static("build"));
app.use(bodyParser.json());
app.use(cors());

app.get("/api/persons", (req, res) => {
  Person.find({}).then((people) => {
    res.json(people.map(formatPerson));
  });
});

app.get("/api/persons/:id", (req, res) => {
  Person.findById(req.params.id)
    .then((person) => {
      if (person) {
        res.json(formatPerson(person));
      } else {
        response.status(404).end();
      }
    })
    .catch((error) => {
      console.log(error);
      response.status(400).send({ error: "malformatted id" });
    });
});

app.delete("/api/persons/:id", (req, res) => {
  Person.findByIdAndRemove(req.params.id)
    .then((result) => {
      res.status(204).end();
    })
    .catch((error) => {
      res.status(400).send({ error: "malformatted id" });
    });
});

// const generateId = () => {
//   id = Math.floor(Math.random() * 10000);
//   return persons.map((p) => p.id).includes(id) ? generateId() : id;
// };

app.post("/api/persons", (req, res) => {
  const body = req.body;

  if (body.name === (undefined || "") || body.number === (undefined || "")) {
    return res.status(400).json({ error: "content missing" });
  }

  // if (Person.map((p) => p.name).includes(body.name)) {
  //   return res.status(400).json({ error: "Name already in the phonebook" });
  // }

  const person = new Person({
    name: body.name,
    number: body.number,
  });

  person.save().then((savedPerson) => {
    res.json(formatPerson(savedPerson));
  });
});

const formatPerson = (person) => {
  return {
    name: person.name,
    number: person.number,
    id: person._id,
  };
};

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
