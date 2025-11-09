import { createContext, type PropsWithChildren, useContext } from 'react';
import { PokemonService } from '../services';
import { buildHttpClient } from '../util';

interface IServiceContext {
  pokemonService: PokemonService;
}

const serviceContext = createContext<IServiceContext>({} as IServiceContext);

export function ProvideService({ children }: PropsWithChildren) {
  // const httpClient = buildHttpClient({ userName: INSIGHT_USERNAME, token: INSIGHT_TOKEN });
  const httpClient = buildHttpClient();
  const pokemonService = new PokemonService(httpClient);

  return <serviceContext.Provider value={{ pokemonService }}>{children}</serviceContext.Provider>;
}

export function useService() {
  return useContext(serviceContext);
}
