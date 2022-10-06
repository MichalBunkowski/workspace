import {
  List,
  ListItem,
  ListItemText,
  SwipeableDrawer,
  useTheme,
} from '@mui/material';
import { pages } from '../../../../constants/pages';
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
      <List
        sx={{
          paddingBottom: theme.spacing(10),
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
    </SwipeableDrawer>
  );
}
