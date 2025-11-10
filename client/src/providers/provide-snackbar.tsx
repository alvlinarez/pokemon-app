import { styled } from '@mui/material';
import { grey } from '@mui/material/colors';
import { SnackbarProvider, MaterialDesignContent, type SnackbarProviderProps } from 'notistack';
import { type PropsWithChildren } from 'react';

const StyledMaterialDesignContent = styled(MaterialDesignContent)(({ theme }) => ({
  '&.notistack-MuiContent-default': {
    backgroundColor: grey[900],
  },
  '&.notistack-MuiContent-success': {
    backgroundColor: theme.palette.success.main,
  },
  '&.notistack-MuiContent-error': {
    backgroundColor: theme.palette.error.main,
  },
  '&.notistack-MuiContent-warning': {
    backgroundColor: theme.palette.warning.main,
  },
  '&.notistack-MuiContent-info': {
    backgroundColor: theme.palette.info.main,
  },
}));

export type ProvideSnackbarProps = Pick<
  SnackbarProviderProps,
  'preventDuplicate' | 'dense' | 'autoHideDuration' | 'hideIconVariant' | 'iconVariant' | 'anchorOrigin' | 'maxSnack'
>;

export function ProvideSnackbar({
  children,
  preventDuplicate = true,
  dense = true,
  autoHideDuration,
  hideIconVariant,
  iconVariant,
  anchorOrigin,
  maxSnack,
}: PropsWithChildren<ProvideSnackbarProps>) {
  return (
    <SnackbarProvider
      preventDuplicate={preventDuplicate}
      dense={dense}
      autoHideDuration={autoHideDuration}
      hideIconVariant={hideIconVariant}
      iconVariant={iconVariant}
      anchorOrigin={anchorOrigin}
      maxSnack={maxSnack}
      Components={{
        default: StyledMaterialDesignContent,
        error: StyledMaterialDesignContent,
        info: StyledMaterialDesignContent,
        success: StyledMaterialDesignContent,
        warning: StyledMaterialDesignContent,
      }}
    >
      {children}
    </SnackbarProvider>
  );
}
