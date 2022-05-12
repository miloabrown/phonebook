const express = require("express");
const app = express();
const bodyParser = require("body-parser");

app.use(bodyParser.json());

let persons = [
  {
    name: "Arto Hellas",
    number: "040-123456",
    id: 1,
  },
  {
    name: "Martti Tienari",
    number: "040-123456",
    id: 2,
  },
  {
    name: "Arto Järvinen",
    number: "040-123456",
    id: 3,
  },
  {
    name: "Lea Kutvonen",
    number: "040-123456",
    id: 4,
  },
];

app.get("/api/persons", (req, res) => {
  res.json(persons);
});

app.get("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  const person = persons.find((p) => p.id === id);
  person ? res.json(person) : res.status(404).end();
});

app.delete("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  persons = persons.filter((p) => p.id !== id);
  res.status(204).end();
});

const generateId = () => {
  id = Math.floor(Math.random() * 10000);
  return persons.map((p) => p.id).includes(id) ? generateId() : id;
};

app.post("/api/persons", (req, res) => {
  const body = req.body;

  if (body.name === (undefined || "") || body.number === (undefined || "")) {
    return res.status(400).json({ error: "content missing" });
  }

  if (persons.map((p) => p.name).includes(body.name)) {
    return res.status(400).json({ error: "Name already in the phonebook" });
  }

  const person = {
    name: body.name,
    number: body.number,
    id: generateId(),
  };

  persons = persons.concat(person);

  res.json(person);
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
