import {
  AppBar,
  Container,
  Divider,
  Toolbar as MuiToolbar,
  useTheme,
} from '@mui/material';
import Link from '../Link';
import { pages } from '../../../constants/pages';
import Logo from '../../logo/Logo';

export default function ToolbarDesk(): JSX.Element {
  const theme = useTheme();
  return (
    <AppBar>
      <Container>
        <MuiToolbar>
          <Logo />
          <Divider
            orientation="vertical"
            flexItem
            sx={{ marginLeft: theme.spacing(2), marginRight: theme.spacing(1) }}
          />
          {pages.map((page) => (
            <Link
              key={page.href}
              href={page.href}
              type="button"
              color="secondary"
            >
              {page.name}
            </Link>
          ))}
        </MuiToolbar>
      </Container>
    </AppBar>
  );
}
