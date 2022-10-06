import { Fab, useTheme, Zoom } from '@mui/material';
import { useMemo } from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';

interface MenuButtonProps {
  isMenuOpened: boolean;
  onMenuToggle(v?: boolean): void;
}

export default function MenuButton({
  isMenuOpened,
  onMenuToggle,
}: MenuButtonProps): JSX.Element {
  const theme = useTheme();

  const transitionDuration = {
    enter: theme.transitions.duration.enteringScreen,
    exit: theme.transitions.duration.leavingScreen,
  };

  const fabs = useMemo(
    () => [
      { name: 'open', label: 'Open Menu', icon: <MenuIcon /> },
      { name: 'close', label: 'Close Menu', icon: <CloseIcon /> },
    ],
    []
  );

  return (
    <>
      {fabs.map((fab) => {
        const isActive = (isMenuOpened ? 'close' : 'open') === fab.name;

        return (
          <Zoom
            key={fab.name}
            in={isActive}
            timeout={transitionDuration}
            style={{
              transitionDelay: `${isActive ? transitionDuration.exit : 0}ms`,
            }}
            unmountOnExit
          >
            <Fab
              sx={{
                position: 'absolute',
                bottom: theme.spacing(3.5),
                zIndex: theme.zIndex.drawer + 2,
              }}
              color="secondary"
              onClick={() => onMenuToggle()}
            >
              {fab.icon}
            </Fab>
          </Zoom>
        );
      })}
    </>
  );
}
