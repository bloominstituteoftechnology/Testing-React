import React, { useState, useEffect } from "react";
import Loader from "react-loader-spinner";

import { getData } from "../api";
import "./star-wars-characters.css";

export default function StarWarsCharacters() {
  // const [url, setUrl] = useState("https://swapi.co/api/people");
  const [url, setUrl] = useState(`https://swapi.co/api/${url}`);
  const [previous, setPrevious] = useState();
  const [next, setNext] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [characters, setCharacters] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    const getCharacters = async () => {
      const characters = await getData(url);
      console.log(characters);
      setNext(characters.next);
      setPrevious(characters.previous);
      setCharacters(characters.results);
      setIsLoading(false);
    };
    getCharacters();
  }, [url]);

  const goToNext = e => {
    e.preventDefault();
    setUrl(next);
  };

  const goToPrevious = e => {
    e.preventDefault();
    setUrl(previous);
  };

  const handleSubmit = e => {
    e.preventDefault();
    setUrl(url);
  }

  return (
    <div>
      {isLoading ? (
        <Loader
          type="ThreeDots"
          color="#FFC402"
          height={30}
          width={100}
          timeout={3000} //3 secs
        />
      ) : (
        <>
          {characters.map(character => (
            <div key={character.url}>{character.name}</div>
          ))}
        </>
      )}
      <form>
      <input className="drop-down" 
        as="select" 
        name="data" 
        value={handleSubmit}>
          <option disabled>Choose an option</option>
          <option value="people">People</option>
          <option value="planets">Planets</option>
          <option value="starships">Starships</option>
          <option value="vehicles">Vehicles</option>
          <option value="species">Species</option>
        </input>
      <div className="buttons">
        <button onClick={goToPrevious} disabled={!previous}>
          Previous
        </button>
        <button onClick={goToNext} disabled={!next}>
          Next
        </button>
      </div>
      </form>
    </div>
  );
}
