import {
  SectionContextProvider,
  useSiteContext,
} from '@workspace/core/contexts';
import { useRouter } from 'next/router';
import { useRef, useEffect, useState } from 'react';
import { TPageData, TPageDataSection } from './Page.types';

import styles from './Page.module.scss';
import { PageNavigation } from '@workspace/editor/ui';

export * from './Page.types';

export const Page: React.FC<{
  data: TPageData;
  pageDefinition: any;
}> = ({ data, pageDefinition }) => {
  const router = useRouter();

  const siteContext = useSiteContext();
  const pageDataRef = useRef<TPageData>(data);
  const saveButtonRef = useRef<HTMLButtonElement>(null);
  const [n, setN] = useState(0);

  useEffect(() => {
    pageDataRef.current = data;
    setN((n) => n + 1);
  }, [router.asPath]);

  const Section = ({ section }: { section: TPageDataSection }) => {
    const sectionDefinition = pageDefinition.registeredSections.find(
      (registeredSection) => registeredSection.type === section.type
    );

    if (!sectionDefinition) return <div>Can't find section</div>;

    return (
      <SectionContextProvider
        getData={() => {
          const sectionData: any = pageDataRef.current.sections.find(
            (_) => _.id === section.id
          );

          return sectionData.data;
        }}
        handleUpdate={(value) => {
          const sectionIndex = pageDataRef.current.sections.findIndex(
            (_) => _.id === section.id
          );

          if (sectionIndex === -1) return;

          pageDataRef.current.sections[sectionIndex].data = value;

          if (saveButtonRef.current) {
            saveButtonRef.current.classList.remove(styles['hidden']);
          }
        }}
      >
        <sectionDefinition.Component />
      </SectionContextProvider>
    );
  };

  return (
    <div>
      <PageNavigation />
      <button
        onClick={() => {
          const page = pageDataRef.current;

          siteContext.connector.updatePage(page.slug, page);

          if (saveButtonRef.current)
            saveButtonRef.current.classList.add(styles['hidden']);
        }}
        className={`${styles['SaveButton']} ${styles['hidden']}`}
        ref={saveButtonRef}
      >
        Save
      </button>

      {pageDataRef.current.sections.map((section, index) => (
        <Section key={section.id} section={section} />
      ))}
    </div>
  );
};
