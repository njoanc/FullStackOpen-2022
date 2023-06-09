import Languages from "./Languages";

const Country = ({ country }) => {
  return (
    <div>
      <h2>{country.name.official}</h2>
      <p>Capital: {country.capital}</p>
      <p>area: {country.area}</p>
      <span>
        Languages: <Languages languages={country.languages} />
      </span>

      <img alt={country.name} src={country.flags.png} />
    </div>
  );
};

export default Country;
