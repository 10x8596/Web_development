import { Stack } from '@mui/material'; // Stack arranges items one dimensionally as a column or row
import { Link } from 'react-router-dom';
import { logo } from '../utils/constants';
import SearchBar from './SearchBar';

const Navbar = () => (
    // p = padding. With sx you can provide any styles to your material ui component
    <Stack 
      direction="row" 
      alignItems="center" 
      p={2} 
      sx={{ 
        position: 'sticky', 
        zIndex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.1)',
        top: 0, 
        justifyContent: 'space-between',
        // boxShadow: '0px 0.5px 20px rgba(255, 255, 255, 0.8)', // Add the boxShadow property for a subtle glow effect
      }}> 
      
      <Link to="/" style={{ display: 'flex', alignItems: 'center' }}>
        <img src={logo} alt="logo" height={45}/>
      </Link>
      <SearchBar />
    </Stack>
)

export default Navbar