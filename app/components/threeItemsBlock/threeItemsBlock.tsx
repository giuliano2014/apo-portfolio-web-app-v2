import Card from "@/components/ui/card/card";
import styles from "./threeItemsBlock.module.css";

const ThreeItemsBlock = () => {
  return (
    <div className={styles.wrapper}>
      <Card />
      <Card />
      <Card />
    </div>
  );
};

export default ThreeItemsBlock;
