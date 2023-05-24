import { Box, Chip } from '@mui/material';

const tags = [
  'react',
  'javascript',
  'typescript',
  'nextjs',
  'mui',
  'material-ui',
  'tailwindcss',
  'css',
  'html',
  'git',
  'github',
];

const Tags = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        maxWidth: '300px',
        justifyContent: 'flex-start',
      }}
    >
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
  );
};

export default Tags;
