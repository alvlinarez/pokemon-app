import type { PropsWithChildren } from 'react';
import { buildHttpClient } from '../util';
import { AuthService, PokemonService } from '../services';
import { ServiceContext } from '../context';

export function ServiceProvider({ children }: PropsWithChildren) {
  const httpClient = buildHttpClient();
  const pokemonService = new PokemonService(httpClient);
  const authService = new AuthService(httpClient);

  return <ServiceContext.Provider value={{ pokemonService, authService }}>{children}</ServiceContext.Provider>;
}
