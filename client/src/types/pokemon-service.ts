import type { PokemonResponse } from './pokemon.ts';

export interface CollectionBody {
  pageSize?: number;
  page?: number;
  sortBy?: 'order' | 'name';
  sortDescending?: boolean;
  filterBy?: string;
}

export interface GetPokemonsProps {
  query?: string;
  request?: Omit<CollectionBody, 'filterBy'>;
}

export interface IPokemonService {
  getPokemons(props: GetPokemonsProps): Promise<PokemonResponse>;
}
