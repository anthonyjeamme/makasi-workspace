import { FC } from 'react';
import { GetServerSideProps } from 'next';

import { Page } from '@workspace/core/entities';
import { Metadata } from '@workspace/utils/metadata';
import { TPageData } from '@workspace/core/entities';
import { FirebaseServerConnector } from '../src/connectors/FirebaseConnector/FirebaseConnector.server';

import serviceAccountKey from '../firebaseServiceAccountKey.json';

type TPageProps = {
  page: TPageData;
};

export const Index: FC<TPageProps> = ({ page }) => {
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
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const slug = '/' + (context.query['path'] as string[]).join('/');

  const page = await FirebaseServerConnector(serviceAccountKey).getPage(slug);

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
