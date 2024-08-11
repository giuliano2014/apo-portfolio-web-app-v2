import Card from "@/components/ui/card/card";
import styles from "./duoBloc.module.css";

//@TODOD: Add types
const duoBloc = ({
  firstColumn,
  secondColumn,
}: {
  firstColumn: any;
  secondColumn: any;
}) => {
  // @TODO: Improve this code with destructuring ...
  return (
    <div className={styles.wrapper}>
      <Card
        key={firstColumn.id}
        height={firstColumn.media.height}
        url={firstColumn.media.url}
        width={firstColumn.media.width}
      >
        <p>{firstColumn.text}</p>
      </Card>

      <Card
        key={secondColumn.id}
        height={secondColumn.media.height}
        url={secondColumn.media.url}
        width={secondColumn.media.width}
      >
        <p>{secondColumn.text}</p>
      </Card>
    </div>
  );
};

export default duoBloc;
