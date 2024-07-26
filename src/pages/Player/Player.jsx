import React, { useEffect, useState } from "react";
import "./Player.css";
import back_arrow_icon from "../../assets/back_arrow_icon.png";
import { useNavigate, useParams } from "react-router-dom";

const Player = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [apiData, setApiData] = useState(null);

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1ZmVhNmYyZWY2ZTIyOWUwZDliMzljZDQzOTE1Yjk0ZiIsIm5iZiI6MTcyMTkyNzM2Mi45NTEyMjgsInN1YiI6IjY2OWNhMDI0MDRmMTkwNjFmN2UxYjQwNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.HyEJxsDU36l3JZbQGmLUGPBIp_kzW9kVfFLPjWqTiIs",
    },
  };

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`,
      options
    )
      .then((response) => response.json())
      .then((response) => {
        console.log(response); // Debug response data
        if (response.results && response.results.length > 0) {
          setApiData(response.results[0]);
        } else {
          console.error("No results found");
        }
      })
      .catch((err) => console.error(err));
  }, [id]);

  if (!apiData) return <div>Loading...</div>;

  return (
    <div className="player">
      <img
        src={back_arrow_icon}
        alt="Back"
        onClick={() => navigate(-1)} // Navigate back to the previous page
      />
      <iframe
        width="90%"
        height="90%"
        src={`https://www.youtube.com/embed/${apiData.key}`}
        title="trailer"
        frameBorder="0"
        allowFullScreen
      ></iframe>
      <div className="player-info">
        <p>{apiData.published_at?.slice(0, 10)}</p>
        <p>{apiData.name}</p>
        <p>{apiData.type}</p>
      </div>
    </div>
  );
};

export default Player;
