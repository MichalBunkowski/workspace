import { FormControl, MenuItem, Select, styled } from '@mui/material';
import { useState } from 'react';

const LanguageItem = styled(MenuItem)`
  text-align: center;
`;

export default function LanguageDropdown(): JSX.Element {
  const [lang, setLang] = useState('en');

  return (
    <FormControl size="small" variant="outlined" color="secondary" fullWidth>
      <Select value={lang} onChange={(e) => setLang(e.target.value)}>
        <LanguageItem value="pl">🇵🇱 Polish</LanguageItem>
        <LanguageItem value="en">󠁧󠁢󠁥󠁮󠁧🇬🇧 English</LanguageItem>
      </Select>
    </FormControl>
  );
}
