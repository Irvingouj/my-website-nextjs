import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Box, Chip } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { blue } from '@mui/material/colors';
import * as React from 'react';

interface Props {
  title: string;
  summary: string;
  author: string;
  date: string;
  image: string;
  tags: string[];
}

const PostCard: React.FC<Props> = ({
  title,
  summary,
  author,
  date,
  image,
  tags,
}) => {
  return (
    <Card
      sx={{
        maxWidth: 600,
        maxHeight: 300,
        display: 'felx',
        borderRadius: '10px',
        mb: '2rem',
      }}
    >
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: blue[500] }} aria-label="recipe">
            IO
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
        <Box sx={{ marginX: '1.5rem', overflow: 'hidden' }}>
          <Typography
            variant="h4"
            color="text.secondary"
            align="center"
            sx={{ textOverflow: 'ellipsis' }}
          >
            {title}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ textOverflow: 'ellipsis' }}
          >
            {summary}
          </Typography>
        </Box>
      </Box>
      <hr />
      <Box sx={{ display: 'flex', mt: '0.5rem' }}>
        {tags.map((tag, idx) => (
          <Chip
            label={tag}
            color="primary"
            key={idx}
            sx={{ m: '0.25rem' }}
            clickable
          />
        ))}
      </Box>
    </Card>
  );
};

export default PostCard;
