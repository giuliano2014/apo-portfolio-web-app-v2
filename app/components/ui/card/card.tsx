import Image from "next/image";
import { ReactNode } from "react";
import styles from "./card.module.css";

type CardsProps = {
  children?: ReactNode;
  hashtag?: string;
  title?: string;
  url: string;
};

const Card = ({ children, hashtag, title, url }: CardsProps) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.box}>
        <Image alt="Picture of the author" height={400} src={url} width={300} />
        {title && <h2 className={styles.title}>{title}</h2>}
        {hashtag && <p className={styles.hashtag}>#{hashtag}</p>}
      </div>
      {children}
    </div>
  );
};

export default Card;
