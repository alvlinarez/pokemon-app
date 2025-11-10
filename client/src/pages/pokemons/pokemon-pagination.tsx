import { Pagination, Stack } from '@mui/material';
import { usePokemonSearch } from '../../context';
import type { ChangeEvent } from 'react';

interface PokemonPaginationProps {
  pageCount: number;
}
export function PokemonPagination({ pageCount }: PokemonPaginationProps) {
  const { page, updatePage } = usePokemonSearch();

  const handleChange = (_event: ChangeEvent<unknown>, value: number) => {
    updatePage(value - 1);
  };

  return (
    <Stack spacing={2} width={'100%'} justifyContent={'center'}>
      <Pagination
        count={pageCount}
        page={page + 1}
        onChange={handleChange}
        sx={{
          '& .MuiPagination-ul': {
            justifyContent: 'center',
          },
        }}
      />
    </Stack>
  );
}
