import React, { useEffect, useRef, useState } from "react";
import "./TitleCards.css";
import { Link } from "react-router-dom";

const TitleCards = ({ title = "Popular on Netflix", category = "now_playing" }) => {
  const [apiData, setApiData] = useState([]);
  const cardsRef = useRef();

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1ZmVhNmYyZWY2ZTIyOWUwZDliMzljZDQzOTE1Yjk0ZiIsIm5iZiI6MTcyMTkyNzM2Mi45NTEyMjgsInN1YiI6IjY2OWNhMDI0MDRmMTkwNjFmN2UxYjQwNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.HyEJxsDU36l3JZbQGmLUGPBIp_kzW9kVfFLPjWqTiIs'
    }
  };

  const handleWheel = (event) => {
    event.preventDefault();
    cardsRef.current.scrollLeft += event.deltaY;
  };

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${category}?language=en-US&page=1`,
          options
        );
        const data = await response.json();
        setApiData(data.results);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };

    fetchMovies();

    const currentRef = cardsRef.current;
    currentRef.addEventListener("wheel", handleWheel);
    return () => {
      currentRef.removeEventListener("wheel", handleWheel);
    };
  }, [category]);

  return (
    <div className="title-cards">
      <h2>{title}</h2>
      <div className="card-list" ref={cardsRef}>
        {apiData.map((card, index) => (
          <Link to={`/player/${card.id}`} className="card" key={card.id}>
            <img
              src={`https://image.tmdb.org/t/p/w500${card.backdrop_path}`}
              alt={card.original_title}
            />
            <p>{card.original_title}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default TitleCards;
