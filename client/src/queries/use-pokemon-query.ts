import { useService } from '../context';
import type { CollectionBody, NamedAPIResource } from '../types';
import { useQuery } from '@tanstack/react-query';
import { useErrorMessage } from '../hooks';
import { QUERY_KEYS } from '../constants';

interface UsePokemonQueryProps {
  query?: string;
  request?: Omit<CollectionBody, 'filterBy'>;
}
export function usePokemonQuery({ query, request }: UsePokemonQueryProps) {
  const { pokemonService } = useService();
  const { data, isFetching, isLoading, isError, error } = useQuery<NamedAPIResource[], Error>({
    queryKey: [QUERY_KEYS.pokemons, query, request],
    queryFn: () =>
      pokemonService.getPokemons({
        request,
        query,
      }),
    initialData: [],
    refetchOnWindowFocus: false,
  });

  useErrorMessage(isError, error?.message || '');

  return {
    data,
    isFetching,
    isLoading,
  } as const;
}
