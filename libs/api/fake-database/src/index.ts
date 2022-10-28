import { TPageData } from '@workspace/core/entities';
import fs from 'fs';

import uniqid from 'uniqid';

const getSitemap = () =>
  JSON.parse(fs.readFileSync('database/sitemap.json', 'utf-8'));

const updateSitemap = (data: any) =>
  fs.writeFileSync('database/sitemap.json', JSON.stringify(data), 'utf-8');

//

const getPage = (slug: string) => {
  const sitemap = getSitemap();

  return getPageData(sitemap.pages[slug].path);
};

const getPageData = (path: string) => {
  const data = fs.readFileSync(`database/${path}`, {
    encoding: 'utf-8',
  });

  if (!data) return null;

  return JSON.parse(data);
};

const updatePage = (page: TPageData) => {
  const sitemap = getSitemap();
  //

  if (!sitemap) return;

  const sitemapPage = sitemap.pages[page.slug];

  fs.writeFileSync(
    `database/${sitemapPage.path}`,
    JSON.stringify(page),
    'utf-8'
  );
};
const createPage = (slug: string, page: TPageData) => {
  const sitemap = getSitemap();

  const path = `pages/${uniqid()}.json`;

  sitemap.pages[slug] = {
    path,
  };

  updateSitemap(sitemap);

  fs.writeFileSync(`database/${path}`, JSON.stringify(page), 'utf-8');
};

const deletePage = (slug: string) => {
  const sitemap = getSitemap();

  fs.unlinkSync(`database/${sitemap.pages[slug].path}`);

  delete sitemap.pages[slug];

  updateSitemap(sitemap);
};

const getAllPages = () => {
  const sitemap = getSitemap();
  const pages: TPageData[] = [];

  for (const page of Object.values<{ path: string }>(sitemap.pages)) {
    console.log(page.path);

    try {
      pages.push(getPageData(page.path));
    } catch {
      console.log(`Error getting ${page.path}`);
    }
  }

  return pages;
};

export const fakeDatabase = {
  getPage,
  updatePage,
  createPage,
  deletePage,
  getAllPages,
};
