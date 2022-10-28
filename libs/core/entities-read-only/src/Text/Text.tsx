import { useSectionContext } from '@workspace/core/contexts';

import styles from './Text.module.scss';

export const Text = ({ id }) => {
  const sectionContext = useSectionContext();

  const value = sectionContext.getField(id);

  return <span className={styles['Text']}>{value}</span>;
};
