import type { Pokemon, PokemonType } from '../../../types';
import { Box, Grid, Stack, Typography } from '@mui/material';
import { colors } from '../../../util';
import { Img } from '../../../components';
import weightImg from '../../../assets/weight.png';
import straightenImg from '../../../assets/straighten.png';

interface AboutPokemonProps {
  pokemon: Pokemon;
}
export function AboutPokemon({ pokemon }: AboutPokemonProps) {
  return (
    <Stack mt={3}>
      <Box width={'100%'} display={'flex'} justifyContent={'center'}>
        <Typography
          fontWeight={700}
          fontSize={'14px'}
          lineHeight={'16px'}
          sx={{ color: colors.pokemonType[pokemon.types[0]?.type.name as PokemonType] || colors.primary }}
        >
          About
        </Typography>
      </Box>

      <Grid container mt={2}>
        <Grid size={4}>
          <Stack flexDirection={'column'} alignItems={'center'} gap={2}>
            <Stack flexDirection={'row'} alignItems={'center'} gap={2}>
              <Img
                src={weightImg}
                alt={'weight'}
                sx={{
                  width: {
                    xs: '16px',
                    lg: '32px',
                  },
                  height: {
                    xs: '16px',
                    lg: '32px',
                  },
                }}
              />
              <Typography>{pokemon.weight} kg</Typography>
            </Stack>

            <Box width={'100%'} display={'flex'} justifyContent={'center'}>
              <Typography fontWeight={400} fontSize={'12px'} sx={{ color: colors.medium }}>
                Weight
              </Typography>
            </Box>
          </Stack>
        </Grid>

        <Grid size={4}>
          <Stack
            flexDirection={'column'}
            alignItems={'center'}
            gap={2}
            sx={{
              borderLeft: `1px solid ${colors.light}`,
              borderRight: `1px solid ${colors.light}`,
            }}
          >
            <Stack flexDirection={'row'} alignItems={'center'} gap={2}>
              <Img
                src={straightenImg}
                alt={'straighten'}
                sx={{
                  width: {
                    xs: '16px',
                    lg: '32px',
                  },
                  height: {
                    xs: '16px',
                    lg: '32px',
                  },
                }}
              />
              <Typography>{pokemon.height} m</Typography>
            </Stack>

            <Box width={'100%'} display={'flex'} justifyContent={'center'}>
              <Typography fontWeight={400} fontSize={'12px'} sx={{ color: colors.medium }}>
                Height
              </Typography>
            </Box>
          </Stack>
        </Grid>

        <Grid size={4}>
          <Stack flexDirection={'column'} alignItems={'center'} gap={0.5}>
            <Stack flexDirection={'column'} alignItems={'center'}>
              {pokemon.abilities.map((ability) => (
                <Typography fontWeight={400} fontSize={'12px'} textTransform={'capitalize'}>
                  {ability.ability.name.replaceAll('-', ' ')}
                </Typography>
              ))}
            </Stack>

            <Box width={'100%'} display={'flex'} justifyContent={'center'}>
              <Typography fontWeight={400} fontSize={'12px'} sx={{ color: colors.medium }}>
                Moves
              </Typography>
            </Box>
          </Stack>
        </Grid>
      </Grid>
    </Stack>
  );
}
