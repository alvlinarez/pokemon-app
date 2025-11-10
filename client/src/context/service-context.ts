import { createContext, useContext } from 'react';
import { AuthService, PokemonService } from '../services';

interface IServiceContext {
  pokemonService: PokemonService;
  authService: AuthService;
}

export const ServiceContext = createContext<IServiceContext>({} as IServiceContext);

export function useService() {
  const context = useContext(ServiceContext);

  if (!context) {
    throw new Error('useService must be used within a service provider.');
  }
  return useContext(ServiceContext);
}
