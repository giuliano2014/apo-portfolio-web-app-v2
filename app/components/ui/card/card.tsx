import Image from "next/image";
import styles from "./card.module.css";

const Card = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.box}>
        <Image
          alt="Picture of the author"
          height={400}
          src="https://placeholderimage.eu/api/300/400"
          width={300}
        />
        <h2 className={styles.title}>Card title</h2>
        <p className={styles.hashtag}>#MyHastag</p>
      </div>
      <p className={styles.description}>Description</p>
    </div>
  );
};

export default Card;
