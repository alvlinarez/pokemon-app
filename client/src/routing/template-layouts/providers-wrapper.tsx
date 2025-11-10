import App from '../../App';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ErrorBoundary } from 'react-error-boundary';
import { ErrorFallback } from '../../components';
import { ServiceProvider } from '../../providers';

export function ProvidersWrapper() {
  const queryClient = new QueryClient();

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <ServiceProvider>
        <QueryClientProvider client={queryClient}>
          <App />
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </ServiceProvider>
    </ErrorBoundary>
  );
}
