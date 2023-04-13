import { AppProps } from 'next/app';
import Head from 'next/head';
import { CacheProvider, EmotionCache } from '@emotion/react';
import { ThemeProvider } from '@mui/material';

import { createEmotionCache, theme } from '@workspace/theme';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { WordleProvider } from '../context/WordleContext';

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
        <WordleProvider>
          <Component {...pageProps} />
        </WordleProvider>
      </ThemeProvider>
    </CacheProvider>
  );
}

export default App;
