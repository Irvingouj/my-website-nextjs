import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Box } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import * as React from 'react';

interface Props {
  title: string;
  summary: string;
  author: string;
  date: string;
  image: string;
}

const PostCard: React.FC<Props> = ({ title, summary, author, date, image }) => {
  return (
    <Card sx={{ maxWidth: 600, maxHeight: 300, display: 'felx' }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            R
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={author}
        subheader={date}
      />
      <Box sx={{ display: 'flex' }}>
        <CardMedia
          component="img"
          image={image}
          alt="Paella dish"
          sx={{
            maxHeight: 120,
            maxWidth: 120,
            minWidth: 120,
            minHeight: 120,
            objectFit: 'contain',
          }}
          className="mx-2.5"
        />
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography
            variant="h4"
            color="text.secondary"
            sx={{ marginX: '1.5rem' }}
            align="center"
          >
            {title}
          </Typography>
        </Box>
      </Box>
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {summary}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default PostCard;
