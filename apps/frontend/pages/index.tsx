import { Page } from '@workspace/core/entities';
import { Metadata } from '@workspace/utils/metadata';
import { GetServerSideProps } from 'next';
import { FirebaseServerConnector } from '../src/connectors/FirebaseConnector/FirebaseConnector.server';

import serviceAccountKey from '../firebaseServiceAccountKey.json';

export function Index({ page }) {
  return (
    <>
      <Metadata
        title={page.metadata.title}
        description={page.metadata.description}
        slug={page.slug}
        canonical=""
      />
      <Page data={page} />
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const page = await FirebaseServerConnector(serviceAccountKey).getPage('/');

  if (!page) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      page: page,
    },
  };
};

export default Index;
