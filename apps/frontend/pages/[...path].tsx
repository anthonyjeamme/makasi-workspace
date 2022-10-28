import { GetServerSideProps } from 'next';

import { Page } from '@workspace/core/entities';
import { sectionDefinitions } from '../src/sections';
import { Metadata } from '@workspace/utils/metadata';
import { TPageData } from '@workspace/core/entities';
import { FC } from 'react';
import { getPage } from '../src/connector/page/page.connector';

type TPageProps = {
  page: TPageData;
};

export const Index: FC<TPageProps> = ({ page }) => {
  return (
    <>
      <Page data={page} pageDefinition={pageDefinition} />
    </>
  );
};

const pageDefinition = {
  registeredSections: sectionDefinitions,
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const slug = '/' + (context.query['path'] as string[]).join('/');

  const page = await getPage({ slug });

  if (!page) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      page: page.page,
    },
  };
};

export default Index;
