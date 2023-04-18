import { Theme, useMediaQuery } from '@mui/material';

import ToolbarDesktop from './Toolbar.desktop';
import ToolbarMobile from './Toolbar.mobile';

export default function Toolbar(): JSX.Element {
  const isMobile = useMediaQuery<Theme>((theme) =>
    theme.breakpoints.down('sm')
  );

  if (isMobile) {
    return <ToolbarMobile />;
  }

  return <ToolbarDesktop />;
}
