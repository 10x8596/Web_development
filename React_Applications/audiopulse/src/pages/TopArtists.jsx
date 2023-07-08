import { Error, Loader, ArtistCard } from "../components";
import { useGetTopChartsQuery } from "../redux/services/shazamCore";

const TopArtists = () => {

  const { data, isFetching, error } = useGetTopChartsQuery();

//  // Once again breaking the code
  if (isFetching) return <Loader title="Loading top artists" />;
  if (error) return <Error message="Something went wrong..." />;

  // structure of the component
  return (
    <div className="flex flex-col">
      <h2 className="font-bold text-3xl text-white text-left mt-4 mb-10">
        Discover Top Artists
      </h2>
      {/* Wrapper for the songs div */}
      <div className="flex flex-wrap sm:justify-start justify-center gap-8">
        {/* To map over the song, we will utilise the song card component 
            For each song, this will return a song card component when mapping over the data*/}
        {data?.map((track) => (
            <ArtistCard 
                key={track.key}
                track={track}
            />
        ))}
      </div>
    </div>
  );
};

export default TopArtists;
