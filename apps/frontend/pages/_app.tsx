import { SiteContextProvider } from '@workspace/core/contexts';
import { AppProps } from 'next/app';
import Head from 'next/head';
import './styles.css';

import { sectionDefinitions } from '../src/sections';
import { FirebaseConnector } from '../src/connectors/FirebaseConnector/FirebaseConnector';

const firebaseConfig = {
  apiKey: 'AIzaSyD4IaUkWbDHkJ76lAgDJ5sF_7AmOKDpND4',
  authDomain: 'makasi-8698c.firebaseapp.com',
  projectId: 'makasi-8698c',
  storageBucket: 'makasi-8698c.appspot.com',
  messagingSenderId: '626906378632',
  appId: '1:626906378632:web:5e4d92be18060ff4b04a3d',
  measurementId: 'G-C9PJYFR5VM',
};

function CustomApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Welcome to frontend!</title>
      </Head>
      <main className="app">
        <SiteContextProvider
          connector={FirebaseConnector(firebaseConfig)}
          sections={sectionDefinitions}
        >
          <Component {...pageProps} />
        </SiteContextProvider>
      </main>
    </>
  );
}

export default CustomApp;
