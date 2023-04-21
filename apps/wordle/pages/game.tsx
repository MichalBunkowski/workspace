import { Grid, Divider, Box, Button, Typography } from '@mui/material';
import { useEffect } from 'react';
import Link from 'next/link';

import {
  SingleWordForm,
  SingleWordFormProps,
} from '../components/form/SingleWordForm';
import { Layout } from '../components/layout/Layout';
import { useWordleStore } from '../store/wordle';

const formsDef: Array<Omit<SingleWordFormProps, 'index'>> = [
  { id: 'form-1st', nextId: 'form-2nd' },
  { id: 'form-2nd', nextId: 'form-3rd' },
  { id: 'form-3rd', nextId: 'form-4th' },
  { id: 'form-4th', nextId: 'form-5th' },
  { id: 'form-5th' },
];

export function Game() {
  const reset = useWordleStore.use.reset();

  useEffect(() => {
    reset();
  }, [reset]);

  return (
    <Layout>
      <Typography variant="h5" align="center" sx={{ mb: 1 }}>
        Good luck!
      </Typography>

      <Grid container spacing={2}>
        {formsDef.map((formDef, index) => (
          <Grid item xs={12} key={formDef.id}>
            <SingleWordForm
              id={formDef.id}
              index={index}
              nextId={formDef.nextId}
            />
            {index < formsDef.length - 1 && (
              <Box mt={2}>
                <Divider />
              </Box>
            )}
          </Grid>
        ))}
      </Grid>

      <Box display="flex" justifyContent="center" mt={4}>
        <Link href="/" replace>
          <Button variant="contained" color="secondary">
            Exit game
          </Button>
        </Link>
      </Box>
    </Layout>
  );
}

export default Game;
