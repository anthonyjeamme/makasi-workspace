import Head from 'next/head';
import { TMetadataProps } from './Metadata.types';
import { cleanStringHTML, getLDJSON } from './Metadata.utils';

export const Metadata = ({
  title,
  description,
  slug,
  imageURL,
  canonical,
  schema = { type: 'website' },
}: TMetadataProps) => {
  return (
    <Head>
      <title>{cleanStringHTML(title)}</title>
      <meta
        name="description"
        content={shorterDescription(cleanStringHTML(description))}
      />
      <meta property="og:title" content={cleanStringHTML(title)} />
      <meta
        property="og:description"
        content={shorterDescription(cleanStringHTML(description))}
      />
      <meta
        property="og:url"
        content={`${process.env['NEXT_PUBLIC_ORIGIN']}${slug}`}
      />
      <meta property="og:type" content="website" />

      {imageURL && <meta property="og:image" content={imageURL} />}
      <link
        rel="canonical"
        href={
          canonical === 'self'
            ? `${process.env['NEXT_PUBLIC_ORIGIN']}${slug}`
            : canonical
        }
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(getLDJSON(schema)) }}
      />
    </Head>
  );
};

export default Metadata;

const shorterDescription = (description: string | null) =>
  description
    ? description.length > 160
      ? description.slice(0, 160) + '...'
      : description
    : '';

const clean = (text: string) => text.replace(/[\t\n]/g, '');
