import { useService } from '../context';
import type { Pokemon } from '../types';
import { useQuery } from '@tanstack/react-query';
import { useErrorMessage } from '../hooks';
import { QUERY_KEYS } from '../constants';

interface UsePokemonByIdProps {
  id: string;
}
export function usePokemonById({ id }: UsePokemonByIdProps) {
  const { pokemonService } = useService();
  const { data, isFetching, isLoading, isSuccess, isError, error } = useQuery<Pokemon, Error>({
    queryKey: [QUERY_KEYS.pokemon, id],
    queryFn: () =>
      pokemonService.getPokemonById({
        id,
      }),
    refetchOnWindowFocus: false,
  });

  useErrorMessage(isError, error?.message || '');

  return {
    data,
    isFetching,
    isLoading,
    isSuccess,
  } as const;
}
