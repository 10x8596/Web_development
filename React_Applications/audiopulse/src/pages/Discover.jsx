import { Error, Loader, SongCard } from "../components";
import { genres } from "../assets/constants";
import { useGetTopChartsQuery } from '../redux/services/shazamCore';

const Discover = () => {

    {/* we get the actual data which is the result of the API call,
        we get the isFetching property which allows us to know if we're currently fetching therefor we can show the loading state 
        we get the error property which allows us to know if an error has happened */}
    const { data, isFetching, error } = useGetTopChartsQuery();
    const genreTitle = 'Pop';

    {/* add a couple of checks and loading states using redux toolkit */}
    if (isFetching) { return <Loader title="Loading Songs..." />; }
    if (error) { return <Error />; }

    return (
        <div className="flex flex-col">
            <div className="w-full flex justify-between items-center sm:flex-row flex-col mt-4 mb-10">
                <h2 className="font-bold text-3xl text-white text-left">Discover {genreTitle}</h2>
                <select
                    onChange={() => {}}
                    value = ''
                    className="bg-black text-gray-300 p-3 text-sm rounded-lg 
                                outline-none sm:mt-0 mt-5 bg-opacity-30 shadow-lg hover:shadow-sm"
                >
                    {/* map over the genres */}
                    {genres.map((genre) => <option key={genre.value} value={genre.value}>{genre.title}</option>)}
                </select>
            </div>

            {/* Wrapper for the songs */}
            <div className="flex flex-wrap sm:justify-start justify-center gap-8">
                {data?.map((song, i) => (
                    <SongCard 
                        key={song.key}
                        song={song}
                        i={i}
                    />
                ))}
            </div>

        </div>
    );
};

export default Discover;
