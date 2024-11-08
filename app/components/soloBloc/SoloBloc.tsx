"use client";

import Card from "@/components/ui/card/Card";
import useIsDesktop from "@/hooks/useIsDesktop";
import { ReactNode } from "react";
import styles from "./soloBloc.module.css";

type SoloBlocProps = {
  children?: ReactNode;
  desktopMediaUrl: string;
  hashtag?: string;
  height: number;
  id: string;
  mimeType: string;
  mobileMediaUrl?: string;
  title?: string;
  width: number;
};

const SoloBloc = ({
  children,
  desktopMediaUrl,
  hashtag,
  height,
  id,
  mimeType,
  mobileMediaUrl,
  title,
  width,
}: SoloBlocProps) => {
  const isDesktop = useIsDesktop();
  const url = isDesktop ? desktopMediaUrl : mobileMediaUrl ?? desktopMediaUrl;

  return (
    <div className={styles.wrapper}>
      <Card
        key={id}
        hashtag={hashtag}
        height={height}
        mimeType={mimeType}
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
