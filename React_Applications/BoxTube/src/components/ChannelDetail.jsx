import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Box } from '@mui/material'

import { Videos, ChannelCard } from './'
import { fetchFromAPI } from '../utils/fetchFromAPI'

const ChannelDetail = () => {
  const [channelDetail, setChannelDetail] = useState(null)
  const [videos, setvideos] = useState([])

  const { id } = useParams();

  useEffect(() => {
    fetchFromAPI(`channels?part=snippet&id=${id}`).then((data) => setChannelDetail(data?.items[0]));
    fetchFromAPI(`search?channelId=${id}&part=snippet&order=date`).then((data) => setvideos(data?.items));
  }, [id])

  return (
    // include the entire screen
    <Box minHeight='95vh'>
      <Box direction="row" justifyContent="center">
        <div style={{
          background: 'linear-gradient(90deg, rgba(2,0,36,1) 27%, rgba(121,9,55,1) 100%, rgba(0,212,255,1) 100%)',
          zIndex: 10,
          height: '300px'
        }}
        />
        <ChannelCard channelDetail={channelDetail} marginTop="-150px"/>
      </Box>
      <Box display="flex" p="2">
        <Box sx={{ mr: { sm: '100px' } }} />
          <Videos videos={videos}/>
      </Box>
    </Box>
  )
}

export default ChannelDetail