import Card from "@/components/ui/card/card";
import styles from "./oneItemBloc.module.css";

//@TODO: Add types
const OneItemBloc = ({
  children,
  hashtag,
  height,
  id,
  title,
  url,
  width,
}: {
  children?: any;
  hashtag?: string;
  height: number;
  id: string;
  title?: string;
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
      >
        {children}
      </Card>
    </div>
  );
};

export default OneItemBloc;
