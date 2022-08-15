import React, { useState, useEffect } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Link
} from "react-router-dom";
import './App.scss';
import Home from "./views/Home";
import Favorites from "./views/Favorites";
import Video from "./views/Video";
import axios from "./axios";
import requests from "./requests";

export default function App() {
  const base_url = "https://image.tmdb.org/t/p/original/";
  const [movies, setMovies] = useState([]);
  const [dramas, setDramas] = useState([]);
  const [horrors, setHorrors] = useState([]);
  const [variety, setVariety] = useState([]);
  const [favorite, setFavorite] = useState(JSON.parse(localStorage.getItem('faves')) || []);
  const [allMovies, setAllMovies] = useState([]);
  let findfavorite = allMovies.filter(movie => favorite.includes(movie.id));

  //get movies from api
  useEffect(() => {
    async function fetchAllMovies() {
      try {
        const requestDramas = await axios.get(requests.fetchKoreanDramas);
        setDramas(requestDramas.data.results);

        const requestMovies = await axios.get(requests.fetchKoreanMovies);
        setMovies(requestMovies.data.results);

        const requestHorrors = await axios.get(requests.fetchHorrorMovies);
        setHorrors(requestHorrors.data.results);

        const requestVariety = await axios.get(requests.fetchComedyMovies);
        setVariety(requestVariety.data.results);

        if (!requestDramas && !requestMovies && !requestVariety && !requestHorrors) {
          return 0;
        } else {
          return requestMovies, requestDramas, requestHorrors, requestVariety;
        }
      } catch (error) {
        console.warn(error)
      }

    }
    fetchAllMovies();
  }, []);

  //combine all movies and remove duplicates
  useEffect(() => {
    let allMovies = [...new Set([...dramas, ...movies, ...horrors, ...variety])]
    allMovies = allMovies.filter((elem, index, self) => self.findIndex(
      (t) => { return (t.id === elem.id) }) === index)
    setAllMovies(allMovies);

  }, [variety]);

  useEffect(() => {
    localStorage.setItem('faves', JSON.stringify(favorite));
  },
    [favorite])

  function handleFave(id) {
    //add favorites
    let filter = favorite.includes(id);
    if (!filter) {
      setFavorite(oldArray => [...oldArray, id]);
    }

    // toggle favorite for heart icon
    if (filter) {
      setFavorite(favorite.filter(item => item !== id));
    }
  }

  const [show, handleShow] = useState(false);

  // scroll add bg
  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY >= 10) {
        handleShow(true);
      } else {
        handleShow(false);
      }
    });
    return () => {
      window.removeEventListener("scroll");
    };
  }, [])

  return (
    <div className="App">
      {/* add base url for live environment */}
      <BrowserRouter basename='/websitedemo/movie-app'>
        <nav className={`nav ${show && "nav_black"}`}>
          <h3 className="logo">FaiFlix &#x2764;</h3>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/favorites">Favorites</Link></li>
          </ul>
        </nav>

        <Routes>
          <Route path="/" element={<Home movies={movies} dramas={dramas} horrors={horrors} variety={variety} handleFave={handleFave} favorite={favorite} base_url={base_url} />} />
          <Route path="/favorites" element={<Favorites handleFave={handleFave} findfavorite={findfavorite} baseUrl={base_url} favorite={favorite} />} />
          <Route path="/details/:id" exact element={<Video />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}


