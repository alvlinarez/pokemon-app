import { createBrowserRouter, Navigate } from 'react-router';
import { ROUTES } from './routing.ts';

export const router = createBrowserRouter([
  {
    lazy: async () => {
      const { ProvidersWrapper } = await import('./template-layouts/providers-wrapper');
      return { element: <ProvidersWrapper /> };
    },
    children: [
      {
        path: ROUTES.pokemons,
        lazy: async () => {
          const { PokemonsResolver } = await import('../pages/pokemons/pokemons-resolver');
          return {
            element: <PokemonsResolver />,
          };
        },
      },
      {
        path: ROUTES.pokemon,
        lazy: async () => {
          const { PokemonResolver } = await import('../pages/pokemon/pokemon-resolver');
          return {
            element: <PokemonResolver />,
          };
        },
      },
      {
        path: '*',
        element: <Navigate to={ROUTES.pokemons} replace />,
      },
    ],
  },
]);
