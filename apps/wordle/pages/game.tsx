import { Grid, Divider, Box } from '@mui/material';
import { useEffect } from 'react';

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
    </Layout>
  );
}

export default Game;
