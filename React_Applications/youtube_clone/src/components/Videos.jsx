import { Stack, Box } from '@mui/material';
import { VideoCard, ChannelCard } from './';

const Videos = ({ videos, direction }) => {
  if (!videos?.length) return 'Loading...';

  return (
    <Stack direction={direction || "row"} flexWrap="wrap" justifyContent="start" gap={{ xs: 2, sm: 2, md: 6}}>
      {videos.map((item, idx) => (
        // if the item has an id and its a video id, the first result will be the video or else the profile channel
        <Box key={idx}>
          {item.id.videoId && <VideoCard video={item} />}
          {item.id.channelId && <ChannelCard channelDetail={item} />}
        </Box>
      ))}
    </Stack>
  )
}

export default Videos