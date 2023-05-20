import React from "react";
import Button from "./Button";

const Person = ({ name, phone, text, handleDelete }) => {
  return (
    <li>
      {name} {phone}
      <Button text={text} handleDelete={handleDelete} />
    </li>
  );
};

export default Person;
