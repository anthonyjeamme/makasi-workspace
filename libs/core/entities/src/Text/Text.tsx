import { useSectionContext } from '@workspace/core/contexts';
import { useRef } from 'react';

import styles from './Text.module.scss';

export const Text = ({ id }) => {
  const sectionContext = useSectionContext();

  const elementRef = useRef<HTMLDivElement>(null);

  const value = sectionContext.getField(id);

  return (
    <div
      className={styles['Text']}
      contentEditable
      ref={elementRef}
      onKeyUp={(e) => {
        if (!elementRef.current) return;
        sectionContext.updateField(id, elementRef.current.innerText);
      }}
      dangerouslySetInnerHTML={{ __html: value }}
    />
  );
};
