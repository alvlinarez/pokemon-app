import { Box } from '@mui/material';

interface LinearBarProps {
  value: number;
  color: string;
}
export function LinearBar({ value, color }: LinearBarProps) {
  return (
    <Box
      sx={{
        width: '100%',
        position: 'relative',
      }}
    >
      <Box
        sx={{
          width: '100%',
          height: 8,
          backgroundColor: color,
          opacity: 0.2,
          borderRadius: 1,
          overflow: 'hidden',
        }}
      />
      <Box
        sx={{
          width: value > 100 ? '100%' : `${value}%`,
          height: '100%',
          backgroundColor: color,
          opacity: 1,
          borderRadius: 1,
          position: 'absolute',
          top: 0,
          left: 0,
        }}
      />
    </Box>
  );
}
