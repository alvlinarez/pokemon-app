import { Box, InputAdornment, TextField } from '@mui/material';
import { Img } from '../../../components';
import searchImg from '../../../assets/search.svg';

export function Search() {
  return (
    <Box sx={{ width: '100%' }}>
      <TextField
        id="search"
        placeholder={'Search'}
        variant="standard"
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
