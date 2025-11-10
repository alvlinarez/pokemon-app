import type { Pokemon, PokemonResponse } from './pokemon';

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

export interface GetPokemonProps {
  id: string;
}

export interface IPokemonService {
  getPokemons(props: GetPokemonsProps): Promise<PokemonResponse>;
  getPokemonById(props: GetPokemonProps): Promise<Pokemon>;
}
