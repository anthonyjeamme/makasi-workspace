import { SectionContextProvider } from '@workspace/core/contexts';
import { useRef, useState } from 'react';
import { TPageData } from './Page.types';

import styles from './Page.module.scss';

export * from './Page.types';

export const Page: React.FC<{
  data: TPageData;
  pageDefinition: any;
  handleUpdate: (page: TPageData) => void;
}> = ({ data, pageDefinition, handleUpdate }) => {
  const pageDataRef = useRef<TPageData>(data);
  const [n, setN] = useState(0);

  const saveButtonRef = useRef<HTMLButtonElement>(null);

  const Section = ({ section }) => {
    const sectionDefinition = pageDefinition.registeredSections.find(
      (registeredSection) => registeredSection.type === section.type
    );

    if (!sectionDefinition) return <div>Can't find section</div>;

    return (
      <SectionContextProvider
        data={section.data}
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
      <button
        onClick={() => {
          const page = pageDataRef.current;

          handleUpdate(page);

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
