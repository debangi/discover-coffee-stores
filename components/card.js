import Image from 'next/image';
import Link from 'next/link';
import styles from './card.module.css';
import cls from 'classnames';

const Card = (props) => {
  return (
    <Link href={props.href}>
      <div className={styles.cardLink}>
        <div className={cls('glass', styles.container)}>
          <div>
            <h2 className={styles.cardHeaderWrapper}>{props.name}</h2>
          </div>
          <div className={styles.cardImageWrapper}>
            <Image
              className={styles.cardImage}
              src={props.imgUrl}
              width={200}
              height={160}
            />
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Card;
