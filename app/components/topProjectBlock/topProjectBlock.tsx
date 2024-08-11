"use client";

import Card from "@/components/ui/card/card";
import DescriptionBlock from "@/components/ui/descriptionBlock/DescriptionBlock";
import ThreeColumnsText from "@/components/ui/threeColumnsText/ThreeColumnsText";
import useIsDesktop from "@/hooks/useIsDesktop";
import styles from "./topProjectBlock.module.css";

const TopProjectBlock = ({
  brand,
  description,
  hastag,
  leftMedia,
  mobileMedia, // @TODO: Add mobileMedia to the render
  rightMedia,
  title,
  tools,
  year,
}: any) => {
  const isDesktop = useIsDesktop();

  return (
    <div className={styles.wrapper}>
      {isDesktop && (
        <Card
          height={leftMedia.height}
          isSpecial={true}
          url={leftMedia.url}
          width={leftMedia.width}
        />
      )}
      <Card
        hashtag={hastag}
        height={rightMedia.height}
        title={title}
        url={rightMedia.url}
        width={rightMedia.width}
      >
        <div className={styles.description}>
          <ThreeColumnsText brand={brand} tools={tools} year={year} />
          <DescriptionBlock description={description} />
        </div>
      </Card>
    </div>
  );
};

// const TopProjectBlock = ({
//   brand,
//   description,
//   hastag,
//   title,
//   tools,
//   year,
//   leftMedia,
//   mobileMedia,
//   rightMedia,
// }: any) => {
//   return (
//     <div>
//       <h1>{title}</h1>
//       <p>{description}</p>
//       <p>{brand}</p>
//       <p>{year}</p>
//       {/* Ajouter ici les autres éléments comme tools, hastag, médias, etc. */}
//       {leftMedia && <img src={leftMedia.url} alt="Left media" />}
//       {mobileMedia && <img src={mobileMedia.url} alt="Mobile media" />}
//       {rightMedia && <img src={rightMedia.url} alt="Right media" />}
//     </div>
//   );
// };

export default TopProjectBlock;
