import { BrowserRouter, Routes, Route } from'react-router-dom';
import { Box } from '@mui/material'; // simple div element
import { Navbar, ChannelDetail, Feed, SearchFeed, VideoDetail } from './components';


const App = () => (
    // wrap entire app with BrowserRouter
    // path of root route
    // if we go to forward slash video and then some random sequence of alphanumerical characters
    // we will be routed to a specific video's page
    <BrowserRouter>
        <Box sx={{ backgroundColor: '#000' }}>
            <Navbar />
            <Routes>
                <Route path="/" exact element={<Feed />} />
                <Route path="/video/:id" element={<VideoDetail />} />
                <Route path="/channel/:id" element={<ChannelDetail />} />
                <Route path="/search/:searchTerm" element={<SearchFeed />} />
            </Routes>
        </Box>
    </BrowserRouter>
  );


export default App