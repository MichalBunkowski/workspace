import { styled, Typography } from '@mui/material';
import { colors } from '@workspace/theme';

export const LogoWord = styled(Typography)`
  line-height: 0.8;

  :nth-child(odd) {
    color: ${colors.blueGreyDark};
  }
  :nth-child(even) {
    color: ${colors.blueGrey};
  }
`;
