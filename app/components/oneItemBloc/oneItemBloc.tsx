"use client";

import Card from "@/components/ui/card/card";
import useIsDesktop from "@/hooks/useIsDesktop";
import styles from "./oneItemBloc.module.css";
import Link from "next/link";

//@TODO: Add types
const OneItemBloc = ({
  children,
  desktopMediaUrl,
  hashtag,
  height,
  id,
  mobileMediaUrl,
  title,
  width,
  slug,
}: {
  children?: any;
  desktopMediaUrl: string;
  hashtag?: string;
  height: number;
  id: string;
  mobileMediaUrl?: string;
  title?: string;
  width: number;
  slug: string;
}) => {
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
