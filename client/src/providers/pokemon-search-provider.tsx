import { type PropsWithChildren, useState } from 'react';
import type { SortBy } from '../types';
import { PokemonSearchContext } from '../context';

export function PokemonSearchProvider({ children }: PropsWithChildren) {
  const [search, setSearch] = useState<string>('');
  const [sortBy, setSortBy] = useState<SortBy>('order');
  const [page, setPage] = useState<number>(0);

  const updatePage = (value: number) => {
    setPage(value);
  };

  const updateSearch = (value: string) => {
    setSearch(value);
  };

  const updateSortBy = (value: SortBy) => {
    setSortBy(value);
  };

  return (
    <PokemonSearchContext.Provider value={{ search, sortBy, page, updateSearch, updateSortBy, updatePage }}>{children}</PokemonSearchContext.Provider>
  );
}
