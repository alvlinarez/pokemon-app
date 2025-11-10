import type { AxiosInstance } from 'axios';
import type { CollectionBody, GetPokemonsProps, IPokemonService } from '../types';

export class PokemonService implements IPokemonService {
  constructor(private httpClient: AxiosInstance) {}

  async getPokemons({ query, request }: GetPokemonsProps) {
    const body: CollectionBody = {
      ...request,
      filterBy: query,
    };

    const res = await this.httpClient.post('/pokemons', body);

    return res.data;
  }
}
