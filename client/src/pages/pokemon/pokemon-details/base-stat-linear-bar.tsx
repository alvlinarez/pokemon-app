import { Stack, Typography } from '@mui/material';
import { LinearBar } from '../../../components';

interface BaseStatLinearBarProps {
  value: number;
  color: string;
}
export function BaseStatLinearBar({ value, color }: BaseStatLinearBarProps) {
  return (
    <Stack flexDirection={'row'} gap={1} alignItems={'center'}>
      <Typography textAlign={'right'} sx={{ width: '30px' }}>
        {value}
      </Typography>
      <LinearBar value={value} color={color} />
    </Stack>
  );
}
