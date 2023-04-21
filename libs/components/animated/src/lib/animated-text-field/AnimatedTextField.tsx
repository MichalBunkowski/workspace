import { TextField as MuiTextField, TextFieldProps } from '@mui/material';
import { motion } from 'framer-motion';
import { forwardRef } from 'react';

const TextField = forwardRef<HTMLDivElement, Omit<TextFieldProps, 'style'>>(
  (props, ref) => <MuiTextField ref={ref} {...props} />
);

TextField.displayName = 'AnimatedTextField';

export const AnimatedTextField = motion(TextField);
