import { useAppDispatch, useAppSelector } from '@/utils/redux/store';
import { toggleSelectTag } from '@/utils/redux/tagsSlice';
import { Box, Chip } from '@mui/material';

const Tags = () => {
  const tags = useAppSelector((state) => state.tags);
  const dispatch = useAppDispatch();
  return (
    <Box
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        maxWidth: '300px',
        justifyContent: 'flex-start',
      }}
    >
      {tags.map((tag, idx) => {
        if (tag.selected) {
          return (
            <Chip
              label={tag.name}
              color="primary"
              key={idx}
              sx={{ m: '0.25rem' }}
              clickable
              onClick={() => {
                dispatch(toggleSelectTag(tag.id));
              }}
            />
          );
        } else {
          return (
            <Chip
              label={tag.name}
              color="primary"
              key={idx}
              sx={{ m: '0.25rem' }}
              clickable
              variant="outlined"
              onClick={() => {
                dispatch(toggleSelectTag(tag.id));
              }}
            />
          );
        }
      })}
    </Box>
  );
};

export default Tags;
