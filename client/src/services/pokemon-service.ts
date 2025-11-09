import type { AxiosInstance } from 'axios';

interface IPokemonService {
  getPokemons(): Promise<void>;
}

export class PokemonService implements IPokemonService {
  constructor(private httpClient: AxiosInstance) {}

  async getPokemons() {
    await this.httpClient.get('');
    return;
  }
}
