import { React, useState } from "react";
import axios from "axios";
import "./Video.scss";

export default function Video() {
  //get video id from url
  let movieId = window.location.pathname.split("/").pop();
  const [trailerUrl, setTrailerUrl] = useState("");

  //movie url
  function getMovie(movie) {
    const requestUrl = `https://api.themoviedb.org/3/movie/${movie}/videos?api_key=a141a3a7775642eba7f3a71405038590&language=en-US`;

    if (movie === false) {
      setTrailerUrl('');
    } else {
      async function fetchData() {
        try {
          const request = await axios.get(requestUrl);
          setTrailerUrl(request.data.results[0].key);
          return request;
        } catch (e) {
          console.warn(e);
        }
      }
      fetchData();
    }
  }

  getMovie(movieId);

  return (
    <main>{trailerUrl ?
      (<div className="video_row">
        <iframe className="responsive" src={`https://www.youtube.com/embed/${trailerUrl}`} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"></iframe>
      </div>) : (<div className="no_video">No video found</div>)} </main>
  )
}