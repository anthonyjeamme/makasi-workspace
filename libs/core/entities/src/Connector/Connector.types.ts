import { TPageData } from '../Page/Page.types';

export type TConnector = {
  init: () => void;
  getPage: (slug: string) => Promise<TPageData | null>;
  updatePage: (slug: string, page: TPageData) => Promise<TPageData | null>;
  createPage: (slug: string, page: TPageData) => Promise<TPageData | null>;
  deletePage: (slug: string) => Promise<void>;
  getAllPages: () => Promise<TPageData[]>;
};
