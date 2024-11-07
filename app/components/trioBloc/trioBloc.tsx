import Card from "@/components/ui/card/Card";
import styles from "./trioBloc.module.css";

// @TODO: Add types
const TrioBloc = ({
  firstColumn,
  secondColumn,
  thirdColumn,
}: {
  firstColumn: any;
  secondColumn: any;
  thirdColumn: any;
}) => {
  return (
    <div className={styles.wrapper}>
      <Card
        key={firstColumn.id}
        height={firstColumn.media.height}
        mimeType={firstColumn.media.mimeType}
        url={firstColumn.media.url}
        width={firstColumn.media.width}
      >
        <p>{firstColumn.text}</p>
      </Card>
      <Card
        key={secondColumn.id}
        height={secondColumn.media.height}
        mimeType={secondColumn.media.mimeType}
        url={secondColumn.media.url}
        width={secondColumn.media.width}
      >
        <p>{secondColumn.text}</p>
      </Card>
      <Card
        key={thirdColumn.id}
        height={thirdColumn.media.height}
        mimeType={thirdColumn.media.mimeType}
        url={thirdColumn.media.url}
        width={thirdColumn.media.width}
      >
        <p>{thirdColumn.text}</p>
      </Card>
    </div>
  );
};

export default TrioBloc;
