import { PokemonsPage } from './pokemons-page';
import { PokemonSearchProvider } from '../../providers';

export function PokemonsResolver() {
  return (
    <PokemonSearchProvider>
      <PokemonsPage />
    </PokemonSearchProvider>
  );
}
