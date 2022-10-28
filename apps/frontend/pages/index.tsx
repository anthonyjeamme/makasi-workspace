import { Page } from '@workspace/core/entities';
import { Metadata } from '@workspace/utils/metadata';
import { GetServerSideProps } from 'next';
import { CONNECTOR } from '../src/connector/CONNECTOR';
import { sectionDefinitions } from '../src/sections';

export function Index({ page }) {
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
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const page = await CONNECTOR.getPage('/');

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

const pageDefinition = {
  registeredSections: sectionDefinitions,
};
