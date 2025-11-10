import type { Pokemon, PokemonType } from '../../../types';
import { Box, Stack } from '@mui/material';
import { PokemonChip } from '../../../components';
import { colors } from '../../../util';
import { AboutPokemon } from './about-pokemon';
import { BaseStats } from './base-stats';

interface PokemonDetailsProps {
  pokemon: Pokemon;
}
export function PokemonDetails({ pokemon }: PokemonDetailsProps) {
  return (
    <Box
      bgcolor={colors.white}
      sx={{
        zIndex: 2,
        marginTop: -4,
        borderRadius: 1,
        minHeight: {
          xs: '70vh',
          lg: '50vh',
        },
      }}
      padding={2}
    >
      <Stack direction="row" gap={2} mt={4} justifyContent={'center'}>
        {pokemon.types.map((pokemonType) => (
          <PokemonChip pokemonType={pokemonType.type.name as PokemonType} />
        ))}
      </Stack>

      <AboutPokemon pokemon={pokemon} />

      <BaseStats pokemon={pokemon} />
    </Box>
  );
}
