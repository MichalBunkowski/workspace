import { Box, Button, Grid, Typography } from '@mui/material';
import { useEffect, useMemo } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { calculateScore } from '@workspace/utils';

import { Layout } from '../components/layout/Layout';
import { useWordleStore } from '../store/wordle';

export function Score() {
  const router = useRouter();

  const guesses = useWordleStore.use.guesses();
  const drawnWord = useWordleStore.use.drawnWord();
  const amountOfTries = useWordleStore.use.amountOfTries();

  const isWinner = useWordleStore.use.isWinner();
  const isGameOver = useWordleStore.use.isGameOver();

  const formattedAmountOfTries = useMemo(() => {
    if (amountOfTries === 1) {
      return `only ${amountOfTries} try`;
    }

    return `${amountOfTries} tries`;
  }, [amountOfTries]);

  useEffect(() => {
    if (!isGameOver) {
      router.replace('/');
    }
  }, [router, isGameOver]);

  if (!isGameOver) return <></>;

  return (
    <Layout>
      <Typography variant="h3" align="center" gutterBottom>
        Your score is <br /> {calculateScore(drawnWord, guesses)}
      </Typography>

      <Typography variant="h5" align="center">
        Correct word was
        <Box my={2}>
          <strong>{drawnWord}</strong>
        </Box>
      </Typography>

      {isWinner && (
        <Typography variant="h5" align="center">
          It took you {formattedAmountOfTries} to guess it. <br /> Good job!{' '}
        </Typography>
      )}

      {!isWinner && (
        <Typography variant="h5" align="center">
          Good luck next time!
        </Typography>
      )}

      <Grid container spacing={4} justifyContent="center" sx={{ mt: 3 }}>
        <Grid item>
          <Link href="/game" replace>
            <Button variant="contained" color="secondary">
              {isWinner ? 'Play again' : 'Try again'}
            </Button>
          </Link>
        </Grid>
        <Grid item>
          <Link href="/" replace>
            <Button variant="contained" color="primary">
              See rules
            </Button>
          </Link>
        </Grid>
      </Grid>
    </Layout>
  );
}

export default Score;
