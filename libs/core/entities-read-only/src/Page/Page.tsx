import { SectionContextProvider } from '@workspace/core/contexts';
import { TPageData } from './Page.types';
export * from './Page.types';

export const Page: React.FC<{
  data: TPageData;
  pageDefinition: any;
}> = ({ data, pageDefinition }) => {
  const Section = ({ section }) => {
    const sectionDefinition = pageDefinition.registeredSections.find(
      (registeredSection) => registeredSection.type === section.type
    );

    if (!sectionDefinition) return <div>Can't find section</div>;

    return (
      <SectionContextProvider data={section.data}>
        <sectionDefinition.Component />
      </SectionContextProvider>
    );
  };

  return (
    <div>
      {data.sections.map((section, index) => (
        <Section key={section.id} section={section} />
      ))}
    </div>
  );
};
