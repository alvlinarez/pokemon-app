import type { Pokemon, PokemonType } from '../../types';
import { Container, Stack, Typography } from '@mui/material';
import { colors } from '../../util';
import { Img } from '../../components';
import { Link } from 'react-router';
import ArrowBack from '../../assets/arrow_back.svg';

interface PokemonPageProps {
  pokemon: Pokemon;
}
export function PokemonPage({ pokemon }: PokemonPageProps) {
  const background = colors.pokemonType[pokemon.types[0].type.name as PokemonType] || colors.primary;

  return (
    <Container sx={{ background, minHeight: '100vh' }}>
      <Stack flexDirection={'row'} alignItems={'center'} justifyContent={'space-between'} padding={2} color={colors.white}>
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
    </Container>
  );
}
