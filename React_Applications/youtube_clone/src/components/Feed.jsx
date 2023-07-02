import { useState, useEffect} from 'react';
import { Box, Stack, Typography } from '@mui/material';
import { SideBar, Videos } from './';
import { fetchFromAPI } from '../utils/fetchFromAPI';

const Feed = () => {

  const [selectedCategory, setSelectedCategory] = useState('New');
  const [videos, setVideos] = useState([]);
  // useEffect is a lifecycle hook which gets called when the component is first rendered
  // we need to provide a dependency array
  // the code inside of this function will only run when the page is reloaded
  useEffect(() => {
    fetchFromAPI(`search?part=snippet&q=${selectedCategory}`).then((data) => setVideos(data.items));
  }, [selectedCategory]);

  return (
    // Stack is going to be the primary wrapper wrapping the sidebar and the main bar
    // md = medium devices or larger
    // Box is implementing the Feed
    <Stack sx={{ flexDirection: { sx: "column", md: "row" }}}> 
      <Box sx={{ // made the body dark (black)
        height: { sx: 'auto', md: '92vh' }, 
        borderRight: '1px solid #3d3d3d',
        px: { sx: 0, md: 2 } // px = padding horizontal
        }}> 
        <SideBar 
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
        
        
        <Typography className='copyright' variant='body2' sx={{ mt: 1.5, color: '#fff' }}> 
          <h2>BoxTube</h2>
        </Typography>
      </Box>

      <Box p={2} sx={{ overflowY: 'auto', height: '90vh', flex: 2}}>
        <Typography variant='h4' fontWeight="bold" marginBottom={2} sx={{ color: 'white' }}>
          {selectedCategory} <span style={{ color: 'white' }}>videos</span>
        </Typography>

        <Videos videos={videos}/>
      </Box>
    </Stack>
  )
}

export default Feed