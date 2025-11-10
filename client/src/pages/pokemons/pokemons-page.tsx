import { Container } from '@mui/material';
import { colors } from '../../util';
import { SearchBar } from './search-bar';

export function PokemonsPage() {
  return (
    <Container sx={{ background: colors.primary, minHeight: '100vh' }}>
      <SearchBar />
    </Container>
  );
}
