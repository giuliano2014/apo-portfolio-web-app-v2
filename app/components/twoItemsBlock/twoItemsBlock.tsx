import Card from "@/components/ui/card/card";
import styles from "./twoItemsBlock.module.css";

const TwoItemsBlock = () => {
  return (
    <div className={styles.wrapper}>
      <Card />
      <Card />
    </div>
  );
};

export default TwoItemsBlock;
