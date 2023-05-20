import Person from "./Person";

const Persons = ({ persons, text, handleDelete }) => {
  return (
    <div>
      <h2>Numbers</h2>
      <ul>
        {persons.map((person) => (
          <Person
            key={person.id}
            name={person.name}
            phone={person.phone}
            text={text}
            handleDelete={() => handleDelete(person)}
          />
        ))}
      </ul>
    </div>
  );
};

export default Persons;
