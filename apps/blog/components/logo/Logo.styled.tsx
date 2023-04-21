import { styled, Typography } from '@mui/material';

import { color } from '@workspace/theme';

export const LogoWord = styled(Typography)`
  line-height: 0.8;

  :nth-child(odd) {
    color: ${color.blueGreyDark};
  }
  :nth-child(even) {
    color: ${color.blueGrey};
  }
`;
