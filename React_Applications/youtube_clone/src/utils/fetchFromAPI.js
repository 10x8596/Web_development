// this is the utility function for fetching API data
import axios from 'axios';

const BASE_URL = 'https://youtube-v31.p.rapidapi.com';

const options = {
    url: BASE_URL,
    params: {
      maxResults: '50'
    },
    headers: {
      'X-RapidAPI-Key': process.env.REACT_APP_RAPID_API_KEY,
      'X-RapidAPI-Host': 'youtube-v31.p.rapidapi.com'
    }
  };

/* This is the function tha allows us to call the API, pass some dynamic url and 
   then call it from within any component within the application */

// async function accepts only one parameter which is the url
  export const fetchFromAPI = async (url) => {
    // whatever requests we make, we always want to start with the BASE_URL
    // destructure the data that we get back from the request
    const { data } = await axios.get(`${BASE_URL}/${url}`, options);
    // the only thing this function will do is return the data
    return data;
}