import { Theme, useMediaQuery } from '@mui/material';

import ToolbarMobile from './Toolbar.mobile';
import ToolbarDesktop from './Toolbar.desktop';

export default function Toolbar(): JSX.Element {
  const isMobile = useMediaQuery<Theme>((theme) =>
    theme.breakpoints.down('sm')
  );

  if (isMobile) {
    return <ToolbarMobile />;
  }

  return <ToolbarDesktop />;
}
