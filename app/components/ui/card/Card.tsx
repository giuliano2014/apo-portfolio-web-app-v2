import VideoPlayer from "@/components/ui/videoPlayer/VideoPlayer";
import Image from "next/image";
import { ReactNode } from "react";
import styles from "./card.module.css";

type CardsProps = {
  children?: ReactNode;
  hashtag?: string;
  height: number;
  isSpecial?: boolean; // @TODO: Rename this property
  mimeType?: string;
  title?: string;
  url: string;
  width: number;
};

const Card = ({
  children,
  hashtag,
  height,
  isSpecial = false,
  mimeType,
  title,
  url,
  width,
}: CardsProps) => {
  return (
    <div className={styles.wrapper}>
      <div className={`${styles.box} ${isSpecial ? styles.specialCard : ""}`}>
        {mimeType === "video/mp4" ? (
          <VideoPlayer src={url} />
        ) : (
          <Image
            alt={title ?? ""}
            className={styles.image}
            height={height}
            src={url}
            width={width}
          />
        )}
        {title && <h2 className={styles.title}>{title}</h2>}
        {hashtag && <p className={styles.hashtag}>#{hashtag}</p>}
      </div>
      {children}
    </div>
  );
};

export default Card;
