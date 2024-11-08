"use client";

import Card from "@/components/ui/card/Card";
import useIsDesktop from "@/hooks/useIsDesktop";
import Link from "next/link";
import { ReactNode } from "react";
import styles from "./oneItemBloc.module.css";

type OneItemBlocProps = {
  children?: ReactNode;
  desktopMediaUrl: string;
  hashtag?: string;
  height: number;
  id: string;
  mobileMediaUrl?: string;
  slug: string;
  title?: string;
  width: number;
};

const OneItemBloc = ({
  children,
  desktopMediaUrl,
  hashtag,
  height,
  id,
  mobileMediaUrl,
  slug,
  title,
  width,
}: OneItemBlocProps) => {
  const isDesktop = useIsDesktop();
  const url = isDesktop ? desktopMediaUrl : mobileMediaUrl ?? desktopMediaUrl;

  return (
    <div className={styles.wrapper}>
      <Link href={`/projects/${slug}`}>
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
      </Link>
    </div>
  );
};

export default OneItemBloc;
