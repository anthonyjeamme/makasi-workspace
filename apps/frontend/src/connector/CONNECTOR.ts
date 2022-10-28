import { TConnector } from '@workspace/core/entities';

export const CONNECTOR: TConnector = {
  getPage: async (slug: string) => {
    const headers = new Headers({ 'Content-Type': 'application/json' });

    const result = await fetch(
      `${process.env['NEXT_PUBLIC_API_ENDPOINT']}/getPage`,
      {
        method: 'POST',
        headers,
        body: JSON.stringify({
          slug,
        }),
      }
    ).then((result) => result.json());

    if (result.notFound) {
      return null;
    }

    return result.page;
  },
  createPage: async (slug, page) => {
    const headers = new Headers({ 'Content-Type': 'application/json' });

    const result = await fetch(
      `${process.env['NEXT_PUBLIC_API_ENDPOINT']}/createPage`,
      {
        method: 'POST',
        headers,
        body: JSON.stringify({
          slug,
          page,
        }),
      }
    ).then((result) => result.json());

    if (!result.success) return null;

    return page;
  },
  deletePage: async (slug) => {
    const headers = new Headers({ 'Content-Type': 'application/json' });

    await fetch(`${process.env['NEXT_PUBLIC_API_ENDPOINT']}/deletePage`, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        slug,
      }),
    }).then((result) => result.json());
  },
  updatePage: async (slug, page) => {
    const headers = new Headers({ 'Content-Type': 'application/json' });

    const result = await fetch(
      `${process.env['NEXT_PUBLIC_API_ENDPOINT']}/updatePage`,
      {
        method: 'POST',
        headers,
        body: JSON.stringify({
          slug,
          page,
        }),
      }
    ).then((result) => result.json());

    if (!result.success) return null;

    return page;
  },
};
