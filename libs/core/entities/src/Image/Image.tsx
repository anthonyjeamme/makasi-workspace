import { useSectionContext } from '@workspace/core/contexts';

import styles from './Image.module.scss';

export const Image = ({ id }) => {
  const sectionContext = useSectionContext();

  const value = sectionContext.getField(id);

  return (
    <span className={styles['Image']}>
      <img src={value} alt="" />
    </span>
  );
};
