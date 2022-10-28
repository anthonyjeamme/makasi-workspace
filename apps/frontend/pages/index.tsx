import { Page } from '@workspace/core/entities';
import { Metadata } from '@workspace/utils/metadata';
import { getPage, updatePage } from '../src/connector/page/page.connector';
import { sectionDefinitions } from '../src/sections';

export async function Index() {
  const page = await getPage({ slug: '/' });

  console.log(page);

  return (
    <>
      <Metadata
        title={page.metadata.title}
        description={page.metadata.description}
        slug={page.slug}
        canonical=""
      />
      <Page
        data={page}
        pageDefinition={pageDefinition}
        handleUpdate={(data) => {
          updatePage({ page: data });
        }}
      />
    </>
  );
}

// export const getServerSideProps: GetServerSideProps = async (context) => {
//   const page = await getPage({ slug: '/' });

//   if (!page) {
//     return {
//       notFound: true,
//     };
//   }

//   return {
//     props: {
//       page: page.page,
//     },
//   };
// };

export default Index;

const pageDefinition = {
  registeredSections: sectionDefinitions,
};
