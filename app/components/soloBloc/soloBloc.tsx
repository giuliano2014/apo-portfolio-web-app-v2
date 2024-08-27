"use client";

import Card from "@/components/ui/card/card";
import useIsDesktop from "@/hooks/useIsDesktop";
import styles from "./soloBloc.module.css";

//@TODO: Add types
const SoloBloc = ({
  children,
  desktopMediaUrl,
  hashtag,
  height,
  id,
  mobileMediaUrl,
  title,
  width,
}: {
  children?: any;
  desktopMediaUrl: string;
  hashtag?: string;
  height: number;
  id: string;
  mobileMediaUrl?: string;
  title?: string;
  width: number;
}) => {
  const isDesktop = useIsDesktop();
  const url = isDesktop ? desktopMediaUrl : mobileMediaUrl ?? desktopMediaUrl;

  return (
    <div className={styles.wrapper}>
      <Card
        key={id}
        hashtag={hashtag}
        height={height}
        title={title}
        url={url}
        width={width}
      >
        {children}
      </Card>
    </div>
  );
};

export default SoloBloc;
