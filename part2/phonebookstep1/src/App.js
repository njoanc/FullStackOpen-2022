import { useEffect, useState } from "react";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import Filter from "./components/Filter";
import Person from "./components/Person";
import personService from "./services/persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newPhone, setPhone] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredPersons, setFilteredPersons] = useState([]);

  useEffect(() => {
    personService.search().then((response) => {
      setPersons(response.data);
    });
  }, []);

  const addPerson = (event) => {
    event.preventDefault();

    if (
      persons.some(
        (person) => person.name === newName && person.phone === newPhone
      )
    ) {
      alert(`${newName} && ${newPhone} already added to the phonebook`);
      return;
    }

    const existingPerson = persons.find((person) => person.name === newName);
    if (existingPerson && existingPerson.phone !== newPhone) {
      const confirmed = window.confirm(
        `${existingPerson.name} is already added to the phonebook, replace the old number with a new one?`
      );
      if (!confirmed) {
        return;
      }
      const updatedPerson = { ...existingPerson, phone: newPhone };
      personService
        .update(existingPerson.id, updatedPerson)
        .then((response) => {
          const updatedPersons = persons.map((p) =>
            p.id !== existingPerson.id ? p : response.data
          );
          setPersons(updatedPersons);
        });
    } else {
      const newPerson = {
        name: newName,
        phone: newPhone,
      };
      personService.create(newPerson).then((response) => {
        setPersons([...persons, response.data]);
        setNewName("");
        setPhone("");
      });
    }
  };

  const handleNewPerson = (event) => {
    console.log("event clicked", event.target.value);
    setNewName(event.target.value);
  };

  const handleNewPhone = (event) => {
    console.log("event clicked", event.target.value);
    setPhone(event.target.value);
  };

  const handleSearch = (event) => {
    const searchTerm = event.target.value.toLowerCase();
    setSearchTerm(searchTerm);

    personService
      .search()
      .then((response) => {
        const filteredPersons = response.data.filter((person) =>
          person.name.toLowerCase().includes(searchTerm)
        );
        setFilteredPersons(filteredPersons);
      })
      .catch((error) => {
        // Handle the error here
        console.log(error);
      });
  };

  const handleDeletePerson = (person) => {
    console.log("person...", person);
    const confirmed = window.confirm(`Delete ${person.name}?`);
    if (!confirmed) {
      return;
    }

    personService
      .deleteOne(person.id)
      .then(() => {
        setPersons(persons.filter((p) => p.id !== person.id));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter searchTerm={searchTerm} handleSearch={handleSearch} />
      {filteredPersons.map((person) => (
        <Person key={person.id} name={person.name} phone={person.phone} />
      ))}
      <div>
        <PersonForm
          addPerson={addPerson}
          newName={newName}
          newPhone={newPhone}
          handleNewName={handleNewPerson}
          handleNewPhone={handleNewPhone}
        />
      </div>

      <Persons
        persons={persons}
        text="delete"
        handleDelete={handleDeletePerson}
      />
    </div>
  );
};

export default App;
