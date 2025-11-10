import App from '../../App';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ErrorBoundary } from 'react-error-boundary';
import { ErrorFallback } from '../../components';
import { ServiceProvider } from '../../providers';
import { ProvideSnackbar } from '../../providers/provide-snackbar.tsx';

export function ProvidersWrapper() {
  const queryClient = new QueryClient();

  return (
    <ProvideSnackbar>
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <ServiceProvider>
          <QueryClientProvider client={queryClient}>
            <App />
            <ReactQueryDevtools initialIsOpen={false} />
          </QueryClientProvider>
        </ServiceProvider>
      </ErrorBoundary>
    </ProvideSnackbar>
  );
}
