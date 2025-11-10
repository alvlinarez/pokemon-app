import { type PropsWithChildren, useState } from 'react';
import type { SortBy } from '../types';
import { PokemonSearchContext } from '../context';

export function PokemonSearchProvider({ children }: PropsWithChildren) {
  const [search, setSearch] = useState<string>('');
  const [sortBy, setSortBy] = useState<SortBy>('number');

  const updateSearch = (value: string) => {
    setSearch(value);
  };

  const updateSortBy = (value: SortBy) => {
    setSortBy(value);
  };

  return <PokemonSearchContext.Provider value={{ search, sortBy, updateSearch, updateSortBy }}>{children}</PokemonSearchContext.Provider>;
}
