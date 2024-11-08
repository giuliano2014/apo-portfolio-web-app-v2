import Card from "@/components/ui/card/card";
import Link from "next/link";
import styles from "./twoItemsBlock.module.css";

type TwoItemsBlockProps = {
  hashtags: string[];
  heights: number[];
  ids: string[];
  slugs: string[];
  titles: string[];
  urls: string[];
  widths: number[];
};

const TwoItemsBlock = ({
  hashtags,
  heights,
  ids,
  slugs,
  titles,
  urls,
  widths,
}: TwoItemsBlockProps) => {
  return (
    <div className={styles.wrapper}>
      {urls.map(
        (
          url,
          index // @TODO: Improve this code
        ) => (
          <Link key={ids[index]} href={`/projects/${slugs[index]}`}>
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
