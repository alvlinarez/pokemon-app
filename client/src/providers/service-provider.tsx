import type { PropsWithChildren } from 'react';
import { buildHttpClient } from '../util';
import { PokemonService } from '../services';
import { ServiceContext } from '../context';

export function ServiceProvider({ children }: PropsWithChildren) {
  // const httpClient = buildHttpClient({ userName: INSIGHT_USERNAME, token: INSIGHT_TOKEN });
  const httpClient = buildHttpClient();
  const pokemonService = new PokemonService(httpClient);

  return <ServiceContext.Provider value={{ pokemonService }}>{children}</ServiceContext.Provider>;
}
