import { Box, InputAdornment, TextField } from '@mui/material';
import { Img } from '../../../components';
import searchImg from '../../../assets/search.svg';
import { usePokemonSearch } from '../../../context';

export function Search() {
  const { search, updateSearch } = usePokemonSearch();

  return (
    <Box sx={{ width: '100%' }}>
      <TextField
        id="search"
        placeholder={'Search'}
        variant="standard"
        value={search}
        onChange={(event) => {
          updateSearch(event.target.value.trim().toLowerCase());
        }}
        sx={{
          backgroundColor: 'white',
          borderRadius: '16px',
          padding: '8px 16px 8px 12px',
          width: '100%',
        }}
        slotProps={{
          input: {
            disableUnderline: true,
            startAdornment: (
              <InputAdornment position={'start'}>
                <Img src={searchImg} alt={'search'} />
              </InputAdornment>
            ),
          },
        }}
      />
    </Box>
  );
}
