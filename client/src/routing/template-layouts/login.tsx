import { Box, Button, Paper, TextField, Typography } from '@mui/material';
import { useAuth, useService } from '../../context';
import { Navigate, useNavigate } from 'react-router';
import { colors } from '../../util';
import { type FormEvent, useState } from 'react';
import { ROUTES } from '../routing';
import { isAxiosError } from 'axios';

interface LoginProps {
  redirectRoute: string;
}
export function Login({ redirectRoute }: LoginProps) {
  const { isUserLoggedIn, isUserLoading, updateUser } = useAuth();
  const { authService } = useService();
  const navigate = useNavigate();

  const [form, setForm] = useState<{ username: string; password: string }>({
    username: '',
    password: '',
  });
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    try {
      setError(null);
      e.preventDefault();
      const { username, password } = form;

      if (!username || !password) {
        setError('Username and Password are required.');
        return;
      }

      const user = await authService.login({ username: username.trim(), password });
      updateUser(user);
      navigate(ROUTES.pokemons);
    } catch (error: unknown) {
      updateUser(null);

      if (isAxiosError(error)) {
        setError(error.response?.data?.message);
      } else {
        setError('Unexpected error occurred.');
      }
    }
  };

  if (isUserLoading) {
    return <Box>Loading...</Box>;
  }

  if (isUserLoggedIn) {
    return <Navigate to={redirectRoute} replace />;
  }

  return (
    <Box bgcolor={colors.primary} height="100vh" display={'flex'} justifyContent={'center'} alignItems={'center'}>
      <Paper sx={{ padding: 4, textAlign: 'center', width: '40%' }}>
        <Typography variant={'h3'} fontWeight={'bold'}>
          Login
        </Typography>

        <Box
          mt={2}
          display={'flex'}
          flexDirection={'column'}
          alignItems="center"
          gap={2}
          component={'form'}
          id={'form-login'}
          onSubmit={handleSubmit}
        >
          <TextField type="text" label={'Username'} value={form.username} onChange={(e) => setForm({ ...form, username: e.target.value })} />

          <TextField type="password" label={'Password'} value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />

          {error && (
            <Typography color={'error'} variant={'subtitle2'}>
              {error}
            </Typography>
          )}

          <Button variant={'contained'} color={'error'} type={'submit'} form={'form-login'}>
            Login
          </Button>
        </Box>
      </Paper>
    </Box>
  );
}
