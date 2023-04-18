import { AppProps } from 'next/app';
import Head from 'next/head';
import { CacheProvider, EmotionCache } from '@emotion/react';
import { ThemeProvider } from '@mui/material';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { createEmotionCache, theme } from '@workspace/theme';

import { Layout } from '../components/layout/Layout';

const clientSideEmotionCache = createEmotionCache();

export interface AppPropsWithEmotionCache extends AppProps {
  emotionCache?: EmotionCache;
}

function App({
  Component,
  pageProps,
  emotionCache = clientSideEmotionCache,
}: AppPropsWithEmotionCache) {
  const router = useRouter();

  console.log(router);

  return (
    <CacheProvider value={emotionCache}>
      <ThemeProvider theme={theme}>
        <Head>
          <title>Welcome to blog!</title>
        </Head>

        <AnimatePresence
          mode="wait"
          initial={false}
          onExitComplete={() => window.scrollTo(0, 0)}
        >
          <Component {...pageProps} key={router.asPath} />
        </AnimatePresence>
      </ThemeProvider>
    </CacheProvider>
  );
}

export default App;
