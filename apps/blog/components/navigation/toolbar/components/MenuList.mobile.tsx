import {
  Grid,
  List,
  ListItem,
  ListItemText,
  SwipeableDrawer,
  useTheme,
} from '@mui/material';

import { pages } from '../../../../constants/pages';
import LanguageDropdown from '../../../inputs/language/LanguageDropdown';
import Link from '../../Link';

interface MenuListProps {
  isMenuOpened: boolean;
  onMenuToggle(v?: boolean): void;
}

export default function MenuList({
  isMenuOpened,
  onMenuToggle,
}: MenuListProps): JSX.Element {
  const theme = useTheme();

  return (
    <SwipeableDrawer
      anchor="bottom"
      open={isMenuOpened}
      onOpen={() => onMenuToggle(true)}
      onClose={() => onMenuToggle(false)}
    >
      <Grid container justifyContent="space-between">
        <Grid item xs={7}>
          <List
            sx={{
              paddingBottom: theme.spacing(12),
            }}
          >
            {pages.map((page) => (
              <Link
                key={page.href}
                href={page.href}
                type="link"
                color="secondary"
                underline="none"
                onClick={() => onMenuToggle(false)}
              >
                <ListItem>
                  <ListItemText primary={page.name} />
                </ListItem>
              </Link>
            ))}
          </List>
        </Grid>
        <Grid item xs={5} sx={{ padding: theme.spacing(2, 2) }}>
          <LanguageDropdown />
        </Grid>
      </Grid>
    </SwipeableDrawer>
  );
}
