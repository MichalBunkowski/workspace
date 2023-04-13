import Link from '../navigation/Link';

import { LogoWord } from './Logo.styled';

export default function Logo(): JSX.Element {
  return (
    <Link type="link" href="/" underline="none" color="secondary">
      <LogoWord>WITH</LogoWord>
      <LogoWord>CODE</LogoWord>
      <LogoWord>FROM</LogoWord>
      <LogoWord>POLAND</LogoWord>
    </Link>
  );
}
