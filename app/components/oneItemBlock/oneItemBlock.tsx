import Card from "@/components/ui/card/card";
import styles from "./oneItemBlock.module.css";

const OneItemBlock = () => {
  return (
    <div className={styles.wrapper}>
      <Card url="https://placeholderimage.eu/api/300/400" />
    </div>
  );
};

export default OneItemBlock;
