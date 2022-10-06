import {
  Button,
  ButtonProps,
  Link as MuiLink,
  LinkProps as MuiLinkProps,
} from '@mui/material';
import NextLink, { LinkProps as NextLinkProps } from 'next/link';

import { omit } from 'lodash-es';

interface ButtonTypeProps extends Omit<ButtonProps, 'href'> {
  readonly type: 'button';
  href: NextLinkProps['href'];
}

interface LinkTypeProps extends Omit<MuiLinkProps, 'href'> {
  readonly type: 'link';
  href: NextLinkProps['href'];
}

export type LinkProps = ButtonTypeProps | LinkTypeProps;

export default function Link(props: LinkProps): JSX.Element {
  const cleanProps = omit(props, ['href', 'type']);

  if (props.type === 'link') {
    return (
      <NextLink href={props.href} passHref>
        <MuiLink {...cleanProps} />
      </NextLink>
    );
  } else {
    return (
      <NextLink href={props.href} passHref>
        <Button {...cleanProps} />
      </NextLink>
    );
  }
}
