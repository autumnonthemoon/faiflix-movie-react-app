import React, { useState, useEffect } from 'react';
import "./Banner.scss";
import axios from '../axios';
import requests from '../requests';
import { Link } from 'react-router-dom';
const base_url = "https://image.tmdb.org/t/p/original/";

export default function Banner() {
    const [movie, setMovie] = useState([]);
    useEffect(() => {
        async function fetchData() {
            try {
                const request = await axios.get(requests.fetchKoreanDramas);
                setMovie(request.data.results[Math.floor(Math.random() * request.data.results.length - 1)]);

                if (!request) {
                    return 0;
                } else {
                    return request;
                }
            } catch (e) {
                console.warn(e);
            }
        }
        fetchData();
    }, []);

    function truncate(str, n) {
        return str?.length > n ? str.substr(0, n - 1) + "..." : str;
    }

    return (
        <>
            {movie !== '' ?
                (<header className="header" style={{ backgroundImage: `url("${base_url}${movie?.backdrop_path}")` }}>
                    <div className="header_description">
                        <h1>{movie?.name || movie?.title || movie?.original_name}</h1>
                        <h2>{truncate(movie?.overview, 400)}</h2>
                        <h3>Rating: {movie.vote_average}</h3>
                        <div className="banner_buttons">
                            <Link to={`/details/${movie.id}`} state={{ movie: movie.id }}>
                                <button className="banner_button">Play</button>
                            </Link>
                            <Link to={"/favorites"}><button className="banner_button">My list</button>
                            </Link>
                        </div>
                    </div>
                </header>) : <div>An error occured</div>}
        </>
    )
}