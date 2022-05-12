import React from "react";
import Person from "./components/Person";
import personService from "./services/persons";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      persons: [],
      newName: "",
      newNumber: "",
    };
  }

  componentDidMount() {
    personService.getAll().then((response) => {
      this.setState({ persons: response });
    });
  }

  personRepeat = (event) => {
    event.preventDefault();
    alert("Name already in list");

    this.setState({
      newName: "",
      newNumber: "",
    });
  };

  deletePerson = (id) => {
    return () => {
      const person = this.state.persons.find((p) => p.id === id);
      const persons = this.state.persons.filter((p) => p.id !== id);
      if (window.confirm(`Really, delete ${person.name}?`)) {
        personService.dele(id).then((response) => {
          this.setState({ persons });
        });
      }
    };
  };

  addPerson = (event) => {
    event.preventDefault();
    const personObject = {
      name: this.state.newName,
      number: this.state.newNumber,
    };

    personService.create(personObject).then((response) => {
      this.setState({
        persons: this.state.persons.concat(response),
        newName: "",
        newNumber: "",
      });
    });
  };

  handleNameChange = (event) => {
    this.setState({ newName: event.target.value });
  };
  handleNumberChange = (event) => {
    this.setState({ newNumber: event.target.value });
  };

  render() {
    return (
      <div>
        <h2>Phonebook</h2>
        <form
          onSubmit={
            this.state.persons
              .map((person) => person.name)
              .includes(this.state.newName)
              ? this.personRepeat
              : this.addPerson
          }
        >
          <div>
            Name:{" "}
            <input
              value={this.state.newName}
              onChange={this.handleNameChange}
            />
          </div>
          <div>
            Number:{" "}
            <input
              value={this.state.newNumber}
              onChange={this.handleNumberChange}
            />
          </div>
          <div>
            <button type="submit" className="add">
              Add
            </button>
          </div>
        </form>
        <h2>Numbers</h2>
        <ul>
          {this.state.persons.map((person) => (
            <Person
              key={person.name}
              name={person.name}
              number={person.number}
              deletePerson={this.deletePerson(person.id)}
            />
          ))}
        </ul>
      </div>
    );
  }
}
