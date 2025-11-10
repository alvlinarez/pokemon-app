import { Box, Grid, Paper, Stack, Typography } from '@mui/material';
import { Img } from '../../../components';
import type { Pokemon } from '../../../types';

interface PokemonItemProps {
  pokemon: Pokemon;
}
export function PokemonItem({ pokemon }: PokemonItemProps) {
  return (
    <Grid size={{ xs: 4, sm: 4, md: 3, lg: 2 }}>
      <Paper>
        <Stack padding={1}>
          <Box width={'100%'} display={'flex'} flexDirection={'row'} justifyContent={'flex-end'}>
            <Typography>#{pokemon.id}</Typography>
          </Box>

          <Box width={'100%'} display={'flex'} justifyContent={'center'} alignItems={'center'}>
            <Img
              src={pokemon.imageUrl}
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
            <Typography textAlign={'center'}>{pokemon.name}</Typography>
          </Box>
        </Stack>
      </Paper>
    </Grid>
  );
}
