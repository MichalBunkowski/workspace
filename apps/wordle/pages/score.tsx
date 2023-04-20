import { Box, Button, Typography } from '@mui/material';
import { useEffect, useMemo } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { Layout } from '../components/layout/Layout';
import { useWordleStore } from '../store/wordle';

export function Score() {
  const router = useRouter();

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
        Your score is <br /> 2137
      </Typography>
      {isWinner && (
        <Typography variant="h5" align="center">
          Correct word was
          <Box my={2}>
            <strong>{drawnWord}</strong>
          </Box>
          It took you {formattedAmountOfTries} to guess it. <br /> Good job!
        </Typography>
      )}
      {!isWinner && (
        <Typography variant="h5" align="center">
          Correct word was <br /> <strong>{drawnWord}</strong>
          <br />
          It took you {formattedAmountOfTries} to guess it. <br /> Good job!
        </Typography>
      )}
      <Box display="flex" justifyContent="center" mt={4}>
        <Link href="/game" replace>
          <Button variant="contained" color="secondary">
            Play again
          </Button>
        </Link>
      </Box>
    </Layout>
  );
}

export default Score;
