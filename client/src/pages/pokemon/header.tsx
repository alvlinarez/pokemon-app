import { colors } from '../../util';
import { Stack, Typography } from '@mui/material';
import { Link } from 'react-router';
import { Img } from '../../components';
import ArrowBack from '../../assets/arrow_back.svg';
import type { Pokemon } from '../../types';

interface HeaderProps {
  pokemon: Pokemon;
}

export function Header({ pokemon }: HeaderProps) {
  return (
    <Stack flexDirection={'row'} alignItems={'center'} justifyContent={'space-between'} padding={2} color={colors.white} zIndex={2}>
      <Stack flexDirection={'row'} alignItems={'center'} gap={2}>
        <Link to={`/pokemons`} style={{ textDecoration: 'none', height: 32 }}>
          <Img src={ArrowBack} alt={'arrow-back'} />
        </Link>

        <Typography textTransform={'capitalize'} fontWeight={700} fontSize={24}>
          {pokemon.name}
        </Typography>
      </Stack>

      <Typography fontWeight={700} fontSize={20}>
        #{pokemon.id}
      </Typography>
    </Stack>
  );
}
