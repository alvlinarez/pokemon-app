import type { Pokemon, PokemonType } from '../../../types';
import { Box, Stack, Typography } from '@mui/material';
import { colors } from '../../../util';
import { BaseStatLinearBar } from './base-stat-linear-bar.tsx';

interface BaseStatsProps {
  pokemon: Pokemon;
}
export function BaseStats({ pokemon }: BaseStatsProps) {
  const pokemonColorType = colors.pokemonType[pokemon.types[0]?.type.name as PokemonType] || colors.primary;

  const stats = pokemon.stats.reduce(
    (previousValue, currentValue) => {
      previousValue[currentValue.stat.name] = currentValue.base_stat;
      return previousValue;
    },
    {} as { [x: string]: number },
  );

  return (
    <Stack mt={3}>
      <Box width={'100%'} display={'flex'} justifyContent={'center'}>
        <Typography fontWeight={700} fontSize={'14px'} lineHeight={'16px'} sx={{ color: pokemonColorType }}>
          Base Stats
        </Typography>
      </Box>

      <Stack color={pokemonColorType} mt={2} flexDirection={'row'}>
        <Stack flexDirection={'column'} borderRight={`1px solid ${colors.light}`} width={'20%'} gap={1}>
          <Typography fontWeight={700} fontSize={'14px'}>
            HP
          </Typography>
          <Typography fontWeight={700} fontSize={'14px'}>
            ATK
          </Typography>
          <Typography fontWeight={700} fontSize={'14px'}>
            DEF
          </Typography>
          <Typography fontWeight={700} fontSize={'14px'}>
            SATK
          </Typography>
          <Typography fontWeight={700} fontSize={'14px'}>
            SDEF
          </Typography>
          <Typography fontWeight={700} fontSize={'14px'}>
            SPD
          </Typography>
        </Stack>

        <Stack flexDirection={'column'} width={'80%'} paddingX={1} gap={0.6}>
          <BaseStatLinearBar color={pokemonColorType} value={stats['hp']} />
          <BaseStatLinearBar color={pokemonColorType} value={stats['attack']} />
          <BaseStatLinearBar color={pokemonColorType} value={stats['defense']} />
          <BaseStatLinearBar color={pokemonColorType} value={stats['special-attack']} />
          <BaseStatLinearBar color={pokemonColorType} value={stats['special-defense']} />
          <BaseStatLinearBar color={pokemonColorType} value={stats['speed']} />
        </Stack>
      </Stack>
    </Stack>
  );
}
