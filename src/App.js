import './App.css';
import { useEffect, useState } from 'react';
import { getAllPokemon } from './utils/pokemon';

function App() {
  const initialURL = "https://pokeapi.co/api/v2/pokemon";
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPokemonData = async() => {
      // すべてのポケモンデータを取得
      let res = await getAllPokemon(initialURL);
      console.log(res);
      setLoading(false);
    };
    fetchPokemonData();

  },[]);
  return (
    <div className="App">
      {loading ? (
        <h1>now loading</h1>
      ) : (
        <h1>load completed</h1>
      )}
      <h1>pokemon</h1>
    </div>
  );
}

export default App;
