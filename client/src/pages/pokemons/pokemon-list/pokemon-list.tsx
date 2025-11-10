import { Grid } from '@mui/material';
import { PokemonItem } from './pokemon-item';
import type { Pokemon } from '../../../types';

interface PokemonListProps {
  pokemons: Pokemon[];
}
export function PokemonList({ pokemons }: PokemonListProps) {
  return (
    <Grid container spacing={2}>
      {pokemons.map((pokemon) => (
        <PokemonItem key={pokemon.name} pokemon={pokemon} />
      ))}
    </Grid>
  );
}
