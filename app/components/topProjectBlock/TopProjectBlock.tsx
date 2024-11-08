"use client";

import Card from "@/components/ui/card/card";
import DescriptionBlock from "@/components/ui/descriptionBlock/DescriptionBlock";
import ThreeColumnsText from "@/components/ui/threeColumnsText/ThreeColumnsText";
import useIsDesktop from "@/hooks/useIsDesktop";
import styles from "./topProjectBlock.module.css";

// @TODO: Add types
const TopProjectBlock = ({
  brand,
  description,
  hastag,
  leftMedia,
  mobileMedia,
  rightMedia,
  title,
  tools,
  year,
}: any) => {
  const isDesktop = useIsDesktop();

  const renderDescription = (
    <div className={styles.description}>
      <ThreeColumnsText brand={brand} tools={tools} year={year} />
      <DescriptionBlock description={description} />
    </div>
  );

  return (
    <div className={styles.wrapper}>
      {isDesktop ? (
        <>
          <Card
            height={leftMedia.height}
            isSpecial={true}
            url={leftMedia.url}
            width={leftMedia.width}
          />
          <Card
            hashtag={hastag}
            height={rightMedia.height}
            title={title}
            url={rightMedia.url}
            width={rightMedia.width}
          >
            {renderDescription}
          </Card>
        </>
      ) : (
        <Card
          hashtag={hastag}
          height={mobileMedia.height}
          title={title}
          url={mobileMedia.url}
          width={mobileMedia.width}
        >
          {renderDescription}
        </Card>
      )}
    </div>
  );
};

export default TopProjectBlock;
