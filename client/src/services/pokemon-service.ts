import type { AxiosInstance } from 'axios';
import type { CollectionBody, GetPokemonProps, GetPokemonsProps, IPokemonService, Pokemon, PokemonResponse } from '../types';

export class PokemonService implements IPokemonService {
  constructor(private httpClient: AxiosInstance) {}

  async getPokemons({ query, request }: GetPokemonsProps): Promise<PokemonResponse> {
    const body: CollectionBody = {
      ...request,
      filterBy: query,
    };

    const res = await this.httpClient.post('/pokemons', body);

    return {
      data: res.data.data,
      pageCount: res.data.pageCount,
    };
  }

  async getPokemonById({ id }: GetPokemonProps): Promise<Pokemon> {
    const res = await this.httpClient.get(`/pokemons/${id}`);

    return res.data as Pokemon;
  }
}
