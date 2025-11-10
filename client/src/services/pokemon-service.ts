import type { AxiosInstance } from 'axios';
import type { CollectionBody, GetPokemonsProps, IPokemonService, PokemonResponse } from '../types';

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
}
