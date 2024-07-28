import Card from "@/components/ui/card/card";
import styles from "./oneItemBlock.module.css";

//@TODO: Add types
const OneItemBlock = ({
  hashtag,
  height,
  id,
  title,
  url,
  width
}: {
  hashtag: string;
  height: number;
  id: string;
  title: string;
  url: string;
  width: number;
}) => {
  return (
    <div className={styles.wrapper}>
      <Card
        key={id}
        hashtag={hashtag}
        height={height}
        title={title}
        url={url}
        width={width}
      />
    </div>
  );
};

export default OneItemBlock;
