import { Container, Stack } from '@mui/material';
import { colors } from '../../util';
import { SearchBar } from './search-bar';
import { PokemonList } from './pokemon-list';
import { PokemonPagination } from './pokemon-pagination';
import { usePokemonSearch } from '../../context';
import { useDebounce } from '../../hooks';
import { usePokemonQuery } from '../../queries';
import { PokemonListSkeleton } from '../../components';

export function PokemonsPage() {
  const { search, page, sortBy } = usePokemonSearch();
  const debouncedSearch = useDebounce(search, 300);

  const { data, isLoading, isFetching, isSuccess } = usePokemonQuery({
    query: debouncedSearch,
    request: {
      page,
      sortBy,
    },
  });

  return (
    <Container sx={{ background: colors.primary, minHeight: '100vh' }}>
      <SearchBar />

      <Stack
        flexDirection={'column'}
        justifyContent={'space-between'}
        padding={2}
        gap={2}
        sx={{
          background: colors.white,
          height: '100%',
          borderRadius: '8px',
          minHeight: {
            xs: '80vh',
            md: '50vh',
          },
        }}
      >
        {isLoading || isFetching ? <PokemonListSkeleton /> : isSuccess ? <PokemonList pokemons={data.data} /> : null}

        {!search && <PokemonPagination pageCount={data.pageCount} />}
      </Stack>
    </Container>
  );
}
