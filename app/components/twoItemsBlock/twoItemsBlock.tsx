import Card from "@/components/ui/card/card";
import Link from "next/link";
import styles from "./twoItemsBlock.module.css";

//@TODOD: Add types
const TwoItemsBlock = ({
  hashtags,
  heights,
  ids,
  titles,
  urls,
  widths,
  slugs,
}: {
  hashtags: string[];
  heights: number[];
  ids: string[];
  titles: string[];
  urls: string[];
  widths: number[];
  slugs: string[];
}) => {
  return (
    <div className={styles.wrapper}>
      {urls.map(
        (
          url,
          index //@TODO: Improve this code
        ) => (
          <Link href={`/projects/${slugs[index]}`} key={ids[index]}>
            <Card
              key={ids[index]}
              hashtag={hashtags[index]}
              height={heights[index]}
              title={titles[index]}
              url={url}
              width={widths[index]}
            />
          </Link>
        )
      )}
    </div>
  );
};

export default TwoItemsBlock;
