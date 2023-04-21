import { Box, InputBase } from '@mui/material';
import { FC, PropsWithChildren } from 'react';

import { SingleWordConsumer, SingleWordProvider } from './SingleWordContext';

interface WordleInputProps {
  name: string;
  isTouched: boolean;
  onChange: (value: string) => void;
}

export const SingleWordInput: FC<PropsWithChildren<WordleInputProps>> = ({
  name,
  isTouched,
  onChange,
  children,
}) => {
  return (
    <SingleWordProvider isTouched={isTouched} onChange={onChange}>
      <SingleWordConsumer>
        {({ value }) => (
          <InputBase name={name} value={value} sx={{ display: 'none' }} />
        )}
      </SingleWordConsumer>
      <Box display="flex" justifyContent="space-between">
        {children}
      </Box>
    </SingleWordProvider>
  );
};
