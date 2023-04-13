import { Container, Grid, Divider, Box } from '@mui/material';

import {
  SingleWordForm,
  SingleWordFormProps,
} from '../components/form/SingleWordForm';

const formsDef: Array<SingleWordFormProps> = [
  { id: 'form-1st', nextId: 'form-2nd' },
  { id: 'form-2nd', nextId: 'form-3rd' },
  { id: 'form-3rd', nextId: 'form-4th' },
  { id: 'form-4th', nextId: 'form-5th' },
  { id: 'form-5th' },
];

export function Index() {
  return (
    <Container maxWidth="xs">
      <Grid container spacing={2}>
        {formsDef.map((formDef, index) => (
          <Grid item xs={12} key={formDef.id}>
            <SingleWordForm id={formDef.id} nextId={formDef.nextId} />
            {index < formsDef.length - 1 && (
              <Box mt={2}>
                <Divider />
              </Box>
            )}
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default Index;
