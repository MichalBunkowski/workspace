import { PropsWithChildren } from 'react';
import { Container } from '@mui/material';

import Toolbar from '../../navigation/toolbar/Toolbar';

import { Nav } from './RootLayout.styled';

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <>
      <Nav>
        <Toolbar />
      </Nav>
      <main>
        <Container>{children}</Container>
      </main>
    </>
  );
}
