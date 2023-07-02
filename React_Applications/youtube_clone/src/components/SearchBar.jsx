import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Paper, IconButton } from '@mui/material'
import { Search } from '@mui/icons-material';

const SearchBar = () => {
  return (
    <Paper
      component="form"
      onSubmit={() => {}} // callback function
      sx={{
        borderRadius: 20,
        border: '1px solid #e3e3e3',
        pl: 2, // padding left
        boxShadow: 'none',
        mr: { sm: 5 }, // margin right on small screens
      }}
    >
      <input
         className="search-bar"
         placeholder="Search"
         value=""
         onChange={() => {}} // callback function
      />
      <IconButton type="submit" sx={{ p: '10px', color: 'red' }}>
        <Search />
      </IconButton>
    </Paper> // Paper is nothing more than a div that is white background with some elevation.
  )
}

export default SearchBar