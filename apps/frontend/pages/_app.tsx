import { SiteContextProvider } from '@workspace/core/contexts';
import { AppProps } from 'next/app';
import Head from 'next/head';
import { CONNECTOR } from '../src/connector/CONNECTOR';
import './styles.css';

function CustomApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Welcome to frontend!</title>
      </Head>
      <main className="app">
        <SiteContextProvider connector={CONNECTOR}>
          <Component {...pageProps} />
        </SiteContextProvider>
      </main>
    </>
  );
}

export default CustomApp;
