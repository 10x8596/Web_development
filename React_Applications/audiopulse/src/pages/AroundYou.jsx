import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

import { Error, Loader, SongCard } from "../components";
import { useGetSongsByCountryQuery } from "../redux/services/shazamCore";

const AroundYou = () => {
  const [country, setCountry] = useState("");
  const [loading, setLoading] = useState(true);
  const { activeSong, isPlaying } = useSelector((state) => state.player);
  const { data, isFetching, error } = useGetSongsByCountryQuery(country);

  // console.log(country); // Should output AU

  useEffect(() => {
    axios
      .get(
        `https://geo.ipify.org/api/v2/country?apiKey=at_d1XIGODWNgoYpMSk7D3SnowMWpCpy`
      )
      .then((res) => setCountry(res?.data?.location.country))
      .catch((err) => console.log(err))
      .finally(() => setLoading(false)); // if it's successful or if there's an error, set the loading to false
    // Personal KEY: at_d1XIGODWNgoYpMSk7D3SnowMWpCpy
  }, [country]);

  // Breaking the application
//   if (isFetching && loading) return <Loader title="Loading songs around you" />;
//   if (error && country) return <Error message="Something went wrong..." />; // if country exists

  // structure of the component
  return (
    <div className="flex flex-col">
      <h2 className="font-bold text-3xl text-white text-left mt-4 mb-10">
        Around you in <span className="font-black">{country}</span>
      </h2>
      {/* Wrapper for the songs div */}
      <div className="flex flex-wrap sm:justify-start justify-center gap-8">
        {/* To map over the song, we will utilise the song card component 
            For each song, this will return a song card component when mapping over the data*/}
        {data?.map((song, i) => (
          <SongCard
            key={song.key}
            song={song}
            isPlaying={isPlaying}
            activeSong={activeSong}
            data={data}
            i={i}
          />
        ))}
      </div>
    </div>
  );
};

export default AroundYou;
