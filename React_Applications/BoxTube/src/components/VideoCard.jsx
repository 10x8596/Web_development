import { Link } from 'react-router-dom';
import { Typography, Card, CardContent, CardMedia } from '@mui/material';
import { CheckCircle } from '@mui/icons-material';
import {
    demoThumbnailUrl, demoVideoUrl, demoVideoTitle,
    demoChannelUrl, demoChannelTitle
} from '../utils/constants';
import { fetchFromAPI } from '../utils/fetchFromAPI';

const VideoCard = ({ video: { id: { videoId }, snippet } }) => { // viewCount, likeCount

    // const viewcount = viewCount;
    // const likecount = likeCount;

    return (
        <Card sx={{
            width: { xs: '75%', sm: '320px', md: '320px' }, // sm is tablets and md is desktop
            height: { xs: '300px', sm: '300px', md: '280px' },
            boxShadow: 'none',
            marginLeft: { xs: '35px', sm: '0px', md: '0px' },
            borderRadius: 10,
            justifyContent: { md: 'center' },
            position: { md: 'relative' },
            '&:hover': {
                boxShadow: '6px 6px 8px rgba(255, 0, 0, 0.5)',
                '& .content': {
                    display: { md: 'block' },
                },
            }
        }}>
            <Link to={videoId ? `/video/${videoId}` : demoVideoUrl}>
                <CardMedia
                    image={snippet?.thumbnails?.high?.url}
                    alt={snippet?.title}
                    sx={{ width: {xs: 360, md: 330}, 
                        height: {xs: 170, md: 375},
                        marginTop: {md: '-48px'} }}
                />
            </Link>
            <CardContent sx={{
                backgroundColor: 'black',
                height: '300px',
                display: { md: 'none' },
                position: { md: 'absolute' }, // Added position absolute
                top: { md: 0 }, // Positioned at the top
                left: { md: 0 }, // Positioned at the left
                right: { md: 0 }, // Positioned at the right
                bottom: { md: 0 }, // Positioned at the bottom
                zIndex: { md: 1 }, // Increased z-index to cover the Card
                '&:hover': {
                    backgroundColor: 'rgba(218,64,102, 0.8)',
                    backdropFilter: 'blur(4px)'
                }
            }} className="content">
                <Link to={videoId ? `/video/${videoId}` : demoVideoUrl}>
                    <Typography variant='subtitle1' fontWeight='bold' color='white'>
                        {snippet?.title.slice(0, 30) || demoVideoTitle.slice(0, 30)}
                    </Typography>
                </Link>
                <Link to={snippet?.channelId ? `/channel/${snippet?.channelId}` : demoChannelUrl}>
                    <Typography variant='subtitle2' fontWeight='bold' color='white'>
                        {snippet?.channelTitle || demoChannelTitle}
                        <CheckCircle sx={{ fontSize: 12, color: 'white', ml: '5px' }} />
                    </Typography>
                </Link>
                {/* <Typography variant='subtitle2' fontWeight='bold' color='white'>
                    {parseInt(viewcount).toLocaleString()} views
                </Typography>
                <Typography variant='subtitle2' fontWeight='bold' color='white'>
                    {parseInt(likecount).toLocaleString()} likes
                </Typography> */}
            </CardContent>
        </Card>
    )
}

export default VideoCard
