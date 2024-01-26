import { useState } from 'react';
import './App.css';
import pokemon from "./pokiemon.json"
import PropTypes from "prop-types"
 
const PokemonRow = ({ pokemonProp, onSelect }) => (
  <tr>
    <td>{pokemonProp.name.english}</td>
    <td>{pokemonProp.type.join(", ")}</td>
    <td>
      <button onClick={() => onSelect(pokemonProp)}>select!</button>
    </td> 
  </tr>
);

PokemonRow.propTypes = {
  pokemonProp: PropTypes.shape({
    name: PropTypes.shape({
      english: PropTypes.string.isRequired,
    }),
    type: PropTypes.arrayOf(PropTypes.string)
  }),
  onSelect: PropTypes.func,
};

const PokemonInfo=({name,base,type})=>(
  <div >
    <h1>{name.english}</h1>
    <table>
      {
        Object.keys(base).map((key)=>(
          <tr key={key}>
            <td>{key}</td>
            <td>{base[key]}</td>
          </tr>
        ))
      }
      <tr>
        <h2>
        <td>Type:</td>
        <td>{type.join(",")}</td>
        </h2>
      </tr>
    </table>
  </div>
)
PokemonInfo.propTypes={
  name: PropTypes.shape({
    english: PropTypes.string,
  }),
  base: PropTypes.shape({
    HP: PropTypes.number.isRequired,
    Attack: PropTypes.number.isRequired,
    Defense: PropTypes.number.isRequired,
    "Sp. Attack": PropTypes.number.isRequired,
    "Sp. Defense": PropTypes.number.isRequired,
    Speed: PropTypes.number.isRequired,
  }),
  type: PropTypes.arrayOf(PropTypes.string)
}

function App() {
  const [filter, setFilter] = useState("");
  const [selectedItem, setSelectedItem] = useState(null);

  return (
    <div
      style={{
        margin: "auto",
        width: 800,
        paddingTop: "1em",
      }}
    >
      <h1 className="title">Pokemon Search</h1>
      <input
        value={filter}
        onChange={(event) => setFilter(event.target.value)}
      />
      <div 
        style={{
          display: "grid",
          gridTemplateColumns: "70% 30%",
          gridColumnGap: "1rem"
        }}>
        <table width="100%">
          <tbody>
            {pokemon
              .filter((pokemon) => pokemon.name.english.toLowerCase().includes(filter.toLowerCase()))
              .slice(0, 20)
              .map((pokemon) => (
                <PokemonRow 
                  pokemonProp={pokemon} 
                  key={pokemon.id} 
                  onSelect={(pokemonProp) => setSelectedItem(pokemonProp)} />
            ))}
          </tbody>
        </table>
        {selectedItem && (
          <PokemonInfo {...selectedItem}/>
        )}
      </div>
    </div>
  );
}

export default App;
