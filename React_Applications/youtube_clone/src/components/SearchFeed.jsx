import { useState, useEffect} from 'react';
import { Box, Typography } from '@mui/material';
import { Videos } from './';
import { fetchFromAPI } from '../utils/fetchFromAPI';
import { useParams } from 'react-router-dom';

// This is the Side Bar and its categories

const SearchFeed = () => {

  const [videos, setVideos] = useState([]);
  const { searchTerm } = useParams();

  useEffect(() => {
    fetchFromAPI(`search?part=snippet&q=${searchTerm}`).then((data) => setVideos(data.items));
  }, [searchTerm]);

  return (
    <Box p={2} sx={{ overflowY: 'auto', height: '90vh', flex: 2}}>
    <Typography variant='h4' fontWeight="bold" marginBottom={2} sx={{ color: 'white' }}>
      Search Results for: <span style={{ color: 'white' }}>{searchTerm}</span> videos
    </Typography>

    <Videos videos={videos}/>
  </Box>
  )
}

export default SearchFeed