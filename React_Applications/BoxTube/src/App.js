import { BrowserRouter, Routes, Route } from'react-router-dom';
import { Box } from '@mui/material'; // simple div element
import { Navbar, ChannelDetail, Feed, SearchFeed, VideoDetail } from './components';
import { alpha } from '@mui/system';


const App = () => (
    // wrap entire app with BrowserRouter
    // path of root route
    // if we go to forward slash video and then some random sequence of alphanumerical characters
    // we will be routed to a specific video's page
    // whole page background color is set to #000
    <BrowserRouter>
        <Box sx={{ background: 'linear-gradient(to right, rgba(0, 0, 0, 1), rgba(107,34,34,0.8))'}}>
            <Navbar />
            <Routes>
                <Route exact path="/" element={<Feed />} />
                <Route path="/video/:id" element={<VideoDetail />} />
                <Route path="/channel/:id" element={<ChannelDetail />} />
                <Route path="/search/:searchTerm" element={<SearchFeed />} />
            </Routes>
        </Box>
    </BrowserRouter>
  );


export default App;

