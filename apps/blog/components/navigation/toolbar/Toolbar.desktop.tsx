import {
  AppBar,
  Container,
  Divider,
  Grid,
  Toolbar as MuiToolbar,
  useTheme,
} from '@mui/material';
import Link from '../Link';
import { pages } from '../../../constants/pages';
import Logo from '../../logo/Logo';
import LanguageDropdown from '../../inputs/language/LanguageDropdown';

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
          <Grid container justifyContent="space-between">
            <Grid item>
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
            </Grid>
            <Grid item>
              <LanguageDropdown />
            </Grid>
          </Grid>
        </MuiToolbar>
      </Container>
    </AppBar>
  );
}
