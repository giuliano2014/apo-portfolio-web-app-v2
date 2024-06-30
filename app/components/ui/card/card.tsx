import Image from "next/image";
import { ReactNode } from "react";
import styles from "./card.module.css";

type CardsProps = {
  children?: ReactNode;
  hashtag?: string;
  isSpecial?: boolean; //@TODO: Rename this prop
  title?: string;
  url: string;
};

const Card = ({
  children,
  hashtag,
  isSpecial = false,
  title,
  url,
}: CardsProps) => {
  return (
    <div className={styles.wrapper}>
      <div className={`${styles.box} ${isSpecial ? styles.specialCard : ""}`}>
        <Image
          alt="Picture of the author"
          className={styles.image}
          height={400}
          src={url}
          width={300}
        />
        {title && <h2 className={styles.title}>{title}</h2>}
        {hashtag && <p className={styles.hashtag}>#{hashtag}</p>}
      </div>
      {children}
    </div>
  );
};

export default Card;
