import { Box } from '@mui/material';
import { Img } from '../../components';
import { Link } from 'react-router';
import arrowLeft from '../../assets/chevron_left.svg';
import arrowRight from '../../assets/chevron_right.svg';

interface PokemonCoverProps {
  url: string;
  order: number;
}
export function PokemonCover({ url, order }: PokemonCoverProps) {
  return (
    <Box width="100%" display={'flex'} justifyContent={'space-around'} alignItems={'center'} mt={4}>
      {order > 1 ? (
        <Link to={`/pokemons/${order - 1}`} style={{ textDecoration: 'none' }}>
          <Img
            src={arrowLeft}
            alt={'arrow_left'}
            sx={{
              width: {
                xs: '24px',
                lg: '48px',
              },
              height: {
                xs: '24px',
                lg: '48px',
              },
            }}
          />
        </Link>
      ) : (
        <Box
          sx={{
            width: {
              xs: '24px',
              lg: '48px',
            },
            height: {
              xs: '24px',
              lg: '48px',
            },
          }}
        />
      )}

      <Img
        src={url}
        alt="Pokemon Cover"
        sx={{
          width: {
            xs: '200px',
            lg: '300px',
          },
          height: {
            xs: '200px',
            lg: '300px',
          },
          zIndex: 3,
        }}
      />

      <Link to={`/pokemons/${order + 1}`} style={{ textDecoration: 'none' }}>
        <Img
          src={arrowRight}
          alt={'arrow_right'}
          sx={{
            width: {
              xs: '24px',
              lg: '48px',
            },
            height: {
              xs: '24px',
              lg: '48px',
            },
          }}
        />
      </Link>
    </Box>
  );
}
