import { useSectionContext } from '@workspace/core/contexts';
import { Image, Text, List, Button } from '@workspace/core/entities';

import styles from './HeadSection.module.scss';
import { THeadSectionDataButton } from './HeadSection.types';

const HeadSection = () => {
  const { getField } = useSectionContext();

  return (
    <div className={styles['HeadSection']}>
      <div className={styles['image']}>
        <Image id="image" alt="" />
      </div>

      <div className={styles['content']}>
        <div className={styles['title']}>
          <Text id={'title'} />
        </div>

        <div className={styles['description']}>
          <Text id={'description'} />
        </div>

        <div className={styles['buttons']}>
          <List id="buttons" className={styles['buttons']}>
            {(id) => <Button id={id} />}
          </List>
        </div>
      </div>
    </div>
  );
};

export default HeadSection;
