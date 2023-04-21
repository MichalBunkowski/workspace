import { Box, Button, Typography, useTheme } from '@mui/material';
import Link from 'next/link';

import { Layout } from '../components/layout/Layout';

export function Index() {
  const theme = useTheme();
  return (
    <Layout>
      <Typography variant="h3" align="center">
        Wordle
      </Typography>
      <Typography variant="h5" align="center" sx={{ mb: 3 }}>
        The Word Guessing Game
      </Typography>

      <Typography variant="h6" align="center" sx={{ mb: 1 }}>
        How to play
      </Typography>

      <Typography variant="body1" align="center" gutterBottom>
        You have <strong>5 tries</strong> to guess the word.
      </Typography>

      <Typography variant="body1" align="center" gutterBottom>
        You can use mouse or keyboard to move between letters.
      </Typography>

      <Typography variant="body1" align="center" gutterBottom>
        Use <strong>backspace</strong> to go back. <br />
        To confirm your guess, press <strong>enter</strong>.
      </Typography>

      <Typography variant="body1" align="center" gutterBottom>
        You need to enter <strong>type 5 letters</strong> and only then you can
        confirm your guess.
      </Typography>

      <Typography variant="body1" align="center" gutterBottom>
        If you guess a letter that is in the word, it will be marked with{' '}
        <Box component="strong" sx={{ color: theme.color.green }}>
          green
        </Box>{' '}
        color.
      </Typography>

      <Typography variant="body1" align="center" gutterBottom>
        If you guess a letter that is in the word, but at different position
        then it will be marked with{' '}
        <Box component="strong" sx={{ color: theme.color.yellow }}>
          yellow
        </Box>{' '}
        color.
      </Typography>

      <Typography variant="body1" align="center" gutterBottom>
        If you don&apos;t guess letter, it will be marked with{' '}
        <Box component="strong" sx={{ color: theme.color.red }}>
          red
        </Box>{' '}
        color.
      </Typography>

      <Box display="flex" justifyContent="center" mt={4}>
        <Link href="/game" replace>
          <Button variant="contained" color="secondary">
            Start game
          </Button>
        </Link>
      </Box>
    </Layout>
  );
}

export default Index;
