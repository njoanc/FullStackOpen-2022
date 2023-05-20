import React from "react";

const PersonForm = (props) => {
  return (
    <form onSubmit={props.addPerson}>
      <div>
        <h3>Add a new Person</h3>
        <p>
          Name: <input value={props.newName} onChange={props.handleNewName} />
        </p>
        <p>
          Phone:{" "}
          <input value={props.newPhone} onChange={props.handleNewPhone} />
        </p>
      </div>
      <button type="submit">submit</button>
    </form>
  );
};

export default PersonForm;
