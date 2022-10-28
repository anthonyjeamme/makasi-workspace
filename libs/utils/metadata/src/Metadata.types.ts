export type TMetadataProps = {
  title: string;
  description: string;
  slug: string;
  imageURL?: string;
  canonical: string;
  schema?: TMetadataSchema;
};

export type TMetadataSchema = TBusinessSchema | TWebsiteSchema;

type TBusinessSchema = {
  type: 'business';
  street_address?: string;
  country_name?: string;
  locality?: string;
  region?: string;
};

type TWebsiteSchema = {
  type: 'website';
};

export type TMetaProperty = [property: string, content: string | undefined];
