import { FC } from 'react';
import { GetServerSideProps } from 'next';

import { Page } from '@workspace/core/entities';
import { sectionDefinitions } from '../src/sections';
import { Metadata } from '@workspace/utils/metadata';
import { TPageData } from '@workspace/core/entities';
import { CONNECTOR } from '../src/connector/CONNECTOR';

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
      <Page data={page} pageDefinition={pageDefinition} />
    </>
  );
};

const pageDefinition = {
  registeredSections: sectionDefinitions,
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const slug = '/' + (context.query['path'] as string[]).join('/');

  const page = await CONNECTOR.getPage(slug);

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
