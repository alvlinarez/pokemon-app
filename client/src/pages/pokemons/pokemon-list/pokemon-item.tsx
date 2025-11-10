import { Box, Grid, Paper, Stack, Typography } from '@mui/material';
import { Img } from '../../../components';
import silhouetteImg from '../../../assets/silhouette.png';
import type { NamedAPIResource } from '../../../types';

interface PokemonItemProps {
  pokemon: NamedAPIResource;
}
export function PokemonItem({ pokemon }: PokemonItemProps) {
  return (
    <Grid size={{ xs: 4, sm: 4, md: 3, lg: 2 }}>
      <Paper>
        <Stack padding={1}>
          <Box width={'100%'} display={'flex'} flexDirection={'row'} justifyContent={'flex-end'}>
            <Typography>#999</Typography>
          </Box>

          <Img src={silhouetteImg} alt={'pokemon'} />

          <Box width={'100%'} display={'flex'} justifyContent={'center'}>
            <Typography textAlign={'center'}>{pokemon.name}</Typography>
          </Box>
        </Stack>
      </Paper>
    </Grid>
  );
}
