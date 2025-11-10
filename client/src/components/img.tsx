import { Box, type SxProps } from '@mui/material';

interface ImgProps {
  src: string;
  alt: string;
  sx?: SxProps;
}
export function Img({ src, alt, sx }: ImgProps) {
  return <Box component={'img'} src={src} alt={alt} sx={sx} />;
}
