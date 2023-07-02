import { Stack, Box } from '@mui/material';
import { VideoCard, ChannelCard } from './';

const Videos = ({ videos }) => {
  return (
    <Stack direction="row" flexWrap="wrap" justifyContent="start" gap={2}>
      {videos.map((item, idx) => (
        // if the item has an id and its a video id, the first result will be the video or else the profile channel
        <Box key={idx}>
          {item.id.videoId && <VideoCard video={item} />}
          {/*item.id.channelId && <ChannelCard channelDetail={item} />*/}
        </Box>
      ))}
    </Stack>
  )
}

export default Videos