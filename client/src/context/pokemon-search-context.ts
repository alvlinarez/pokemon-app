import { createContext, useContext } from 'react';
import type { SortBy } from '../types';

interface IPokemonSearchContext {
  search: string;
  sortBy: SortBy;
  page: number;
  updatePage: (value: number) => void;
  updateSearch: (value: string) => void;
  updateSortBy: (value: SortBy) => void;
}

export const PokemonSearchContext = createContext<IPokemonSearchContext>({} as IPokemonSearchContext);

export function usePokemonSearch() {
  const context = useContext(PokemonSearchContext);

  if (!context) {
    throw new Error('usePokemonSearch must be used within a pokemon search provider.');
  }

  return context;
}
