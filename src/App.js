import './App.css';
import { useEffect, useState } from 'react';
import { getAllPokemon, getPokemon } from './utils/pokemon';
import Card from './componets/Card';

function App() {
  const initialURL = "https://pokeapi.co/api/v2/pokemon";
  const [loading, setLoading] = useState(true);
  const [pokemonData, setPokemonData] = useState([]);
  const [nextURL, setNextURL] = useState("");
  const [prevURL, setPrevURL] = useState("");


  useEffect(() => {
    const fetchPokemonData = async() => {
      // すべてのポケモンデータを取得
      let res = await getAllPokemon(initialURL);
      loadPokemon(res.results);
      setNextURL(res.next);
      setPrevURL(res.previous);
      setLoading(false);
    };
    fetchPokemonData();

  },[]);

  const loadPokemon = async (data) => {
    let _pokemonData = await Promise.all(data.map((pokemon) => {
      let pokemonRecord = getPokemon(pokemon.url);
      return pokemonRecord;
    }))
    setPokemonData(_pokemonData); 
  };

  
  const handleNextPage = async () =>{
    setLoading(true);
    let data = await getAllPokemon(nextURL);
    // console.log(data);
    await loadPokemon(data.results);
    setNextURL(data.next);
    setPrevURL(data.previous);
    setLoading(false);

  };

  const handlePrevPage = async () =>{
    if (!prevURL) return;
    setLoading(true);
    let data = await getAllPokemon(prevURL);
    await loadPokemon(data.results);
    setNextURL(data.next);
    setPrevURL(data.previous);
    setLoading(false);
  };

  // console.log(pokemonData);
  return (
    <div className="App">
      {loading ? (
        <h1>now loading</h1>
      ) : (
        <div className='pokemonCardContainer'>
          {pokemonData.map((pokemon,i) => {
            return <Card key={i} pokemon={pokemon}/>
          })}
        </div>
      )}
      <div className='btn'>
        <button onClick={handlePrevPage}>前へ</button>
        {/* prevが作動しないのはなぜ？？ */}
        <button onClick={handleNextPage}>次へ</button>
      </div>
    </div>
  );
}

export default App;
