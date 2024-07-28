"use client";

import Card from "@/components/ui/card/card";
import DescriptionBlock from "@/components/ui/descriptionBlock/DescriptionBlock";
import ThreeColumnsText from "@/components/ui/threeColumnsText/ThreeColumnsText";
import useIsDesktop from "@/hooks/useIsDesktop";
import styles from "./topProjectBlock.module.css";

const TopProjectBlock = () => {
  const isDesktop = useIsDesktop();

  return (
    <div className={styles.wrapper}>
      {isDesktop && (
        <Card height={200} isSpecial={true} url="https://placeholderimage.eu/api/300/400" width={300} />
      )}
      <Card
        hashtag="Direction artistique"
        height={200}
        title="Los Angeles"
        url="https://placeholderimage.eu/api/300/400"
        width={300}
      >
        <div className={styles.description}>
          <ThreeColumnsText brand="Soi Paris" tools="PS AI ID" year="2023" />
          <DescriptionBlock description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique." />
        </div>
      </Card>
    </div>
  );
};

export default TopProjectBlock;
