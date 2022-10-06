import { AppProps } from 'next/app';
import Head from 'next/head';
import { createEmotionCache, theme } from '@workspace/theme';
import { CacheProvider, EmotionCache } from '@emotion/react';
import { ThemeProvider } from '@mui/material';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import RootLayout from '../components/layouts/root-layout/RootLayout';

const clientSideEmotionCache = createEmotionCache();

export interface AppPropsWithEmotionCache extends AppProps {
  emotionCache?: EmotionCache;
}

function App({
  Component,
  pageProps,
  emotionCache = clientSideEmotionCache,
}: AppPropsWithEmotionCache) {
  return (
    <CacheProvider value={emotionCache}>
      <ThemeProvider theme={theme}>
        <Head>
          <title>Welcome to blog!</title>
        </Head>
        <RootLayout>
          <Component {...pageProps} />
        </RootLayout>
      </ThemeProvider>
    </CacheProvider>
  );
}

export default App;
