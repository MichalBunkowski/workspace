import { Container } from '@mui/material';
import { motion } from 'framer-motion';
import { FC, PropsWithChildren } from 'react';

const variants = {
  hidden: { opacity: 0 },
  enter: { opacity: 1 },
  exit: { opacity: 0 },
};

export const Layout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <Container maxWidth="xs">
      <motion.main
        initial="hidden"
        animate="enter"
        exit="exit"
        variants={variants}
        transition={{ type: 'linear' }}
      >
        {children}
      </motion.main>
    </Container>
  );
};
