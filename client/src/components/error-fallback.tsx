import { Alert, AlertTitle, Box, Button } from '@mui/material';
import type { FallbackProps } from 'react-error-boundary';

export function ErrorFallback({ error, resetErrorBoundary }: FallbackProps) {
  return (
    <Box
      sx={{
        display: 'grid',
        height: 400,
        justifyContent: 'center',
        alignContent: 'center',
      }}
    >
      <Alert
        severity="error"
        action={
          <Button onClick={resetErrorBoundary} variant="contained" color="secondary">
            Reset
          </Button>
        }
      >
        <AlertTitle>Something went wrong!</AlertTitle>
        <pre>{error.message}</pre>
      </Alert>
    </Box>
  );
}
