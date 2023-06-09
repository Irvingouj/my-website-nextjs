import SearchIcon from '@mui/icons-material/Search';
import IconButton from '@mui/material/IconButton';
import InputBase from '@mui/material/InputBase';
import Paper from '@mui/material/Paper';

const SearchBar = ({
  searchInput,
  setSearchInput,
}: {
  searchInput: string;
  setSearchInput: (s: string) => void;
}) => {
  return (
    <Paper
      component="form"
      sx={{
        p: '2px 4px',
        display: 'flex',
        alignItems: 'center',
        width: 260,
        borderRadius: '40px',
      }}
    >
      <InputBase
        sx={{ ml: 1, flex: 1, outline: 'none' }}
        placeholder="Search Blog"
        inputProps={{ 'aria-label': 'search slog' }}
        className="focus:outline-none"
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
      />
      <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
        <SearchIcon />
      </IconButton>
    </Paper>
  );
};

export default SearchBar;
