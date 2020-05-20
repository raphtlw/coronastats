import Head from 'next/head';
import { ThemeProvider } from 'styled-components';
import dynamic from 'next/dynamic';

import '../styles/global.css';
import '../assets/fonts/index.css';

const theme = {
  textColor: '#f9f9f9',
  margin: '1rem 1.8rem',
};

const PWAPrompt: any = dynamic(() => import('react-ios-pwa-prompt'), {
  ssr: false,
});

export default ({ Component, pageProps }) => {
  return (
    <>
      <Head>
        <title>CoronaStats</title>
      </Head>
      <PWAPrompt permanentlyHideOnDismiss={false} />
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  );
};
