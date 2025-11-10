import { Chip } from '@mui/material';
import type { PokemonType } from '../types';
import { colors } from '../util';

interface PokemonChipProps {
  pokemonType: PokemonType;
}

export function PokemonChip({ pokemonType }: PokemonChipProps) {
  return (
    <Chip
      label={pokemonType}
      size="small"
      sx={{
        backgroundColor: colors.pokemonType[pokemonType],
        color: 'white',
        textTransform: 'capitalize',
        fontWeight: 700,
      }}
    />
  );
}
