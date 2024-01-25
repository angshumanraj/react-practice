import './App.css';
import pokiemon from './pokiemon.json';
import PropTypes from "prop-types"

const PokemonRow = ({pokemon}) => (
  <tr>
    <td>{pokemon.name.english}</td>
    <td>{pokemon.type.join(", ")}</td>
  </tr>
);

PokemonRow.propTypes = {
  pokemon: PropTypes.shape({
    name: PropTypes.shape({
      english: PropTypes.string
    }),
    type: PropTypes.arrayOf(PropTypes.string)
  }),
};

function App() {
  return (
    <div style={{
      margin: "auto",
      width: 800,
      paddingTop: "1rem"
    }}>
      <h1 className='title'>Pokiemon Search</h1>
      <table width="100%">
        <thead>
          <tr>
            <th>Name</th>
            <th>Type</th>
          </tr>
        </thead>
        <tbody>
          {pokiemon.slice(0, 20).map((pokemon) => (
            <PokemonRow pokemon={pokemon} key={pokemon.id} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
