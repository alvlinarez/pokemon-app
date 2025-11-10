import { Box, Grid, Paper, Stack, Typography } from '@mui/material';
import silhouette from '../../assets/silhouette.png';
import { Img } from '../index.ts';
import { PAGE_SIZE } from '../../constants';

function PokemonSkeleton() {
  return (
    <Grid size={{ xs: 4, sm: 4, md: 3, lg: 2 }}>
      <Paper>
        <Stack padding={1}>
          <Box width={'100%'} display={'flex'} flexDirection={'row'} justifyContent={'flex-end'}>
            <Typography>#999</Typography>
          </Box>

          <Box width={'100%'} display={'flex'} justifyContent={'center'} alignItems={'center'}>
            <Img
              src={silhouette}
              alt={'pokemon'}
              sx={{
                height: {
                  xs: '72px',
                  lg: '100px',
                },
                width: {
                  xs: '72px',
                  lg: '100px',
                },
              }}
            />
          </Box>

          <Box width={'100%'} display={'flex'} justifyContent={'center'}>
            <Typography textAlign={'center'}>Pokemon Name</Typography>
          </Box>
        </Stack>
      </Paper>
    </Grid>
  );
}

export function PokemonListSkeleton() {
  return (
    <Grid container spacing={2}>
      {[...new Array(PAGE_SIZE)].map((_, index) => (
        <PokemonSkeleton key={index} />
      ))}
    </Grid>
  );
}
