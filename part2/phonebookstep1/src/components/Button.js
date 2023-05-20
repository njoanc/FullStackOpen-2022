const Button = ({ handleDelete, text }) => {
  return <button onClick={handleDelete}>{text}</button>;
};

export default Button;
