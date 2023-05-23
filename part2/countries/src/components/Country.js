import Languages from "./Languages";
const Country = ({ country, text, handleClick }) => {
  return (
    <div>
      <h2>{country.name.official}</h2>
      <p>Capital: {country.capital}</p>
      <p>area: {country.area}</p>
      <p>
        Languages: <Languages languages={country.languages} />
      </p>

      <img alt={country.name} src={country.flags.png} />
    </div>
  );
};

export default Country;
