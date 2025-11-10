import { Box, Button, Paper, TextField, Typography } from '@mui/material';
import { useAuth, useService } from '../../context';
import { Navigate, useNavigate, Link } from 'react-router';
import { colors, isValidEmail } from '../../util';
import { type FormEvent, useState } from 'react';
import { ROUTES } from '../routing';
import { isAxiosError } from 'axios';

export function Register() {
  const { isUserLoggedIn, isUserLoading, updateUser } = useAuth();
  const { authService } = useService();
  const navigate = useNavigate();

  const [form, setForm] = useState<{ username: string; email: string; password: string; password2: string }>({
    username: '',
    email: '',
    password: '',
    password2: '',
  });
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    try {
      setError(null);
      e.preventDefault();
      const { username, password, email, password2 } = form;

      if (!username || !password || !email || !password2) {
        setError('Fields are required.');
        return;
      }

      if (!isValidEmail(email)) {
        setError('Email invalid.');
        return;
      }

      if (password !== password2) {
        setError('Passwords are different.');
        return;
      }

      if (password.length < 5) {
        setError('Passwords must be at least 5 characters.');
        return;
      }

      const user = await authService.register({ username: username.trim(), email, password });
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
    return <Navigate to={ROUTES.pokemons} replace />;
  }

  return (
    <Box bgcolor={colors.primary} height="100vh" display={'flex'} justifyContent={'center'} alignItems={'center'}>
      <Paper
        sx={{
          padding: { xs: 1, lg: 4 },
          textAlign: 'center',
          width: {
            xs: '90%',
            lg: '40%',
          },
        }}
      >
        <Typography variant={'h3'} fontWeight={'bold'}>
          Register
        </Typography>

        <Box
          mt={2}
          display={'flex'}
          flexDirection={'column'}
          alignItems="center"
          gap={2}
          component={'form'}
          id={'form-register'}
          onSubmit={handleSubmit}
        >
          <TextField type="text" label={'Username'} value={form.username} onChange={(e) => setForm({ ...form, username: e.target.value })} />

          <TextField type="email" label={'Email'} value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />

          <TextField type="password" label={'Password'} value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />

          <TextField
            type="password"
            label={'Confirm Password'}
            value={form.password2}
            onChange={(e) => setForm({ ...form, password2: e.target.value })}
          />

          {error && (
            <Typography color={'error'} variant={'subtitle2'}>
              {error}
            </Typography>
          )}

          <Button variant={'contained'} color={'error'} type={'submit'} form={'form-register'}>
            Register
          </Button>
        </Box>

        <Typography color={'text'} variant={'body2'} mt={2}>
          Do you already have an account? <Link to={ROUTES.login}>Login</Link>
        </Typography>
      </Paper>
    </Box>
  );
}
