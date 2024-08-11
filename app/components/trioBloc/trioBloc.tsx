import Card from "@/components/ui/card/card";
import styles from "./trioBloc.module.css";

//@TODO: Add types
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
        height={firstColumn.media.height}
        url={firstColumn.media.url}
        width={firstColumn.media.width}
      >
        <p>{firstColumn.text}</p>
      </Card>
      <Card
        height={secondColumn.media.height}
        url={secondColumn.media.url}
        width={secondColumn.media.width}
      >
        <p>{secondColumn.text}</p>
      </Card>
      <Card
        height={thirdColumn.media.height}
        url={thirdColumn.media.url}
        width={thirdColumn.media.width}
      >
        <p>{thirdColumn.text}</p>
      </Card>
    </div>
  );
};

export default TrioBloc;
