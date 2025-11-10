import { useEffect } from 'react';
import { useSnackbar } from 'notistack';

export function useErrorMessage(isError: boolean, message: string) {
    const { enqueueSnackbar } = useSnackbar();

    useEffect(() => {
        if (isError) {
            enqueueSnackbar(message, { variant: 'error' });
        }
    }, [isError, message, enqueueSnackbar]);
}
