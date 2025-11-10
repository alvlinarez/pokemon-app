import { Box, Stack, Typography } from '@mui/material';
import { SortBy } from './sort-by';
import { Search } from './search';
import { Img } from '../../../components';
import whitePokeballImg from '../../../assets/white-pokeball.png';
import { colors } from '../../../util';
import { useAuth, useService } from '../../../context';
import { useNavigate } from 'react-router';
import { ROUTES } from '../../../routing';
import Link from '@mui/material/Link';

export function SearchBar() {
  const navigate = useNavigate();
  const { user, updateUser } = useAuth();
  const { authService } = useService();

  const handleLogout = async () => {
    try {
      await authService.logout();
      updateUser(null);
      navigate(ROUTES.login);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Box sx={{ padding: 2 }}>
      <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'}>
        <Stack direction="row" alignItems="center" gap={2}>
          <Img src={whitePokeballImg} alt={'pokeball'} sx={{ height: 24, width: 24 }} />
          <Typography fontWeight={700} fontStyle={'bold'} fontSize={'24px'} lineHeight={'32px'} color={colors.white}>
            Pokedex
          </Typography>
        </Stack>

        <Stack direction={'row'} alignItems={'center'} gap={2}>
          <Typography sx={{ color: colors.white }}>Hello, {user?.username}</Typography>
          <Link component="button" sx={{ color: colors.white, textDecorationColor: colors.white }} variant="body2" onClick={handleLogout}>
            Logout
          </Link>
        </Stack>
      </Stack>

      <Stack direction="row" alignItems="center" justifyContent="space-between" gap={2} my={2}>
        <Search />

        <SortBy />
      </Stack>
    </Box>
  );
}
