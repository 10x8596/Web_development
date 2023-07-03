import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Paper, IconButton } from '@mui/material'
import { Search } from '@mui/icons-material';

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    // with every react application, we need this because when a form is submitted, the page is reloaded.
    e.preventDefault();

    if(searchTerm) {
      navigate(`/search/${searchTerm}`);
      // at the end, reset the searchterm to an empty string
      setSearchTerm('');
    }
  }


  return (
    <Paper
      component="form"
      onSubmit={handleSubmit} // callback function
      sx={{
        borderRadius: 20,
        border: 'none',
        pl: 2, // padding left
        boxShadow: '0px 2px 8px rgba(218,64,10, 0.4)', // white glow and shadow
        mr: { sm: 5 }, // margin right on small screens
        background: 'linear-gradient(to right, black, rgb(14,14,14), black)', // linear gradient
      }}
    >
      <input
         className="search-bar"
         placeholder="Search"
         value={searchTerm}
         onChange={(e) => setSearchTerm(e.target.value)} // callback function
         style={{
          color: 'white',
          '::placeholder': {
            color: 'white',
            opacity: 0.7,
          }
         }}
      />
      <IconButton type="submit" sx={{ p: '10px', color: 'red' }}>
        <Search />
      </IconButton>
    </Paper> // Paper is nothing more than a div that is white background with some elevation.
  )
}

export default SearchBar