import type { Pokemon, PokemonType } from '../../types';
import { Container } from '@mui/material';
import { colors } from '../../util';
import { Header } from './header';
import { PokemonCover } from './pokemon-cover';
import { PokemonDetails } from './pokemon-details';

interface PokemonPageProps {
  pokemon: Pokemon;
}
export function PokemonPage({ pokemon }: PokemonPageProps) {
  const background = colors.pokemonType[pokemon.types[0].type.name as PokemonType] || colors.primary;

  return (
    <Container sx={{ background, minHeight: '100vh' }}>
      <Header pokemon={pokemon} />

      <PokemonCover url={pokemon.imageUrl} order={Number(pokemon.id)} />

      <PokemonDetails pokemon={pokemon} />
    </Container>
  );
}
