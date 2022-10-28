import { useSectionContext } from '@workspace/core/contexts';
import { useRef } from 'react';

export const Button = ({
  id,
  className = '',
}: {
  id: string;
  className?: string;
}) => {
  const sectionContext = useSectionContext();
  const elementRef = useRef<HTMLButtonElement>(null);
  const value = sectionContext.getField(id);

  return (
    <button className={className} ref={elementRef}>
      <span
        contentEditable
        dangerouslySetInnerHTML={{ __html: value.data }}
        onKeyUp={(e) => {
          if (!elementRef.current) return;
          sectionContext.updateField(id, {
            ...value,
            data: elementRef.current.innerText,
          });
        }}
      />
    </button>
  );
};
