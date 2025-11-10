import { createBrowserRouter, Navigate } from 'react-router';
import { ROUTES } from './routing.ts';

export const router = createBrowserRouter([
  {
    lazy: async () => {
      const { ProvidersWrapper } = await import('./template-layouts');
      return { element: <ProvidersWrapper /> };
    },
    children: [
      {
        path: ROUTES.login,
        lazy: async () => {
          const { Login } = await import('./template-layouts');
          return {
            element: <Login redirectRoute={ROUTES.pokemons} />,
          };
        },
      },
      {
        path: ROUTES.register,
        lazy: async () => {
          const { Register } = await import('./template-layouts');
          return {
            element: <Register />,
          };
        },
      },
      {
        lazy: async () => {
          const { Private } = await import('./template-layouts');
          return {
            element: <Private redirectRoute={ROUTES.login} />,
          };
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
        ],
      },
      {
        path: '*',
        element: <Navigate to={ROUTES.login} replace />,
      },
    ],
  },
]);
