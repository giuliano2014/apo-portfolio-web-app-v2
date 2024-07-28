import Card from "@/components/ui/card/card";
import styles from "./twoItemsBlock.module.css";

//@TODOD: Add types
const TwoItemsBlock = ({
  hashtags,
  heights,
  ids,
  titles,
  urls,
  widths,
}: {
  hashtags: string[];
  heights: number[];
  ids: string[];
  titles: string[];
  urls: string[];
  widths: number[];
}) => {
  return (
    <div className={styles.wrapper}>
      {urls.map((url, index) => ( //@TODO: Improve this code
        <Card
          key={ids[index]}
          hashtag={hashtags[index]}
          height={heights[index]}
          title={titles[index]}
          url={url}
          width={widths[index]}
        />
      ))}
    </div>
  );
};

export default TwoItemsBlock;
