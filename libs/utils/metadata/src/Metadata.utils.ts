import { TMetadataSchema, TMetaProperty } from './Metadata.types';

export const getLDJSON = (schema: TMetadataSchema) => {
  switch (schema.type) {
    case 'business':
      return {
        '@context': 'http://schema.org/',
        '@type': 'LocalBusiness',
        address: {
          '@type': 'PostalAddress',
          streetAddress: schema.street_address,
          addressLocality: schema.locality,
          addressRegion: schema.region,
          addressCountry: 'France',
        },
      };

    default:
      return {
        '@context': 'http://schema.org/',
        '@type': 'WebSite',
      };
  }
};

export const cleanStringHTML = (str: string): string =>
  str?.replace(/<[^>]*>?/gm, '');
