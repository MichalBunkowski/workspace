import { LogoWord } from './Logo.styled';
import Link from '../navigation/Link';

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
