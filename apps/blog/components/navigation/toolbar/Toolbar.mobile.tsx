import { AppBar, Grid, Toolbar as MuiToolbar, useTheme } from '@mui/material';

import useToggle from '../../../hooks/use-toggle';
import Logo from '../../logo/Logo';

import MenuButton from './components/MenuButton.mobile';
import MenuList from './components/MenuList.mobile';

export default function ToolbarMobile(): JSX.Element {
  const theme = useTheme();
  const [isMenuOpened, toggleMenu] = useToggle();

  return (
    <>
      <AppBar
        position="fixed"
        sx={{ top: 'auto', bottom: 0, zIndex: theme.zIndex.drawer + 1 }}
      >
        <MuiToolbar>
          <MenuButton isMenuOpened={isMenuOpened} onMenuToggle={toggleMenu} />
          <Grid container justifyContent="center">
            <Grid item>
              <Logo />
            </Grid>
          </Grid>
        </MuiToolbar>
      </AppBar>
      <MenuList isMenuOpened={isMenuOpened} onMenuToggle={toggleMenu} />
    </>
  );
}
