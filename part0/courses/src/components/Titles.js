const Titles = ({ titles }) => {
  return (
    <ul style={{ listStyle: "none", padding: 0 }}>
      <li>
        <strong>{titles}</strong>
      </li>
    </ul>
  );
};

export default Titles;
