export type TPageData = {
  id: string;
  slug: string;
  metadata: TPageDataMetadata;
  sections: TPageDataSection[];
};

export type TPageDataMetadata = {
  title: string;
  description: string;
};

export type TPageDataSection = any;
