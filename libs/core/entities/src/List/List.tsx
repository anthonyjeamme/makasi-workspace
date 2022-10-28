import { useSectionContext } from '@workspace/core/contexts';

export const List = ({ id, children, className = '' }) => {
  const { getField } = useSectionContext();

  const value = getField('buttons') as any[];

  return (
    <div className={className}>
      {value?.map((element) => {
        const elementId = id + '.' + element.id;

        return children(elementId);
      })}
    </div>
  );
};
