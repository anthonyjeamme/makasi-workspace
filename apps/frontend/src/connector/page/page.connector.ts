import { TPageData } from '@workspace/core/entities';

type TGetPageProps = { slug: string };
type TGetPage = (props: TGetPageProps) => Promise<TGetPageReturns>;
type TGetPageReturns = TPageData | null;

export const getPage: TGetPage = async ({ slug }) => {
  const headers = new Headers({ 'Content-Type': 'application/json' });

  const result = await fetch('http://localhost:4200/api/getPage', {
    method: 'POST',
    headers,
    body: JSON.stringify({
      slug,
    }),
  }).then((result) => result.json());

  if (result.notFound) {
    return null;
  }

  return result.page;
};

export const updatePage = async ({ page }: { page: TPageData }) => {
  const headers = new Headers({ 'Content-Type': 'application/json' });

  const result = await fetch('http://localhost:4200/api/updatePage', {
    method: 'POST',
    headers,
    body: JSON.stringify({
      page,
    }),
  }).then((result) => result.json());

  if (!result.success) return false;

  return true;
};
