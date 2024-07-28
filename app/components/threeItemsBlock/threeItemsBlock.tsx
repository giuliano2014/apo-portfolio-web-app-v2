import Card from "@/components/ui/card/card";
import styles from "./threeItemsBlock.module.css";

const ThreeItemsBlock = () => {
  return (
    <div className={styles.wrapper}>
      <Card url="https://placeholderimage.eu/api/300/400" />
      <Card url="https://placeholderimage.eu/api/300/400" />
      <Card url="https://placeholderimage.eu/api/300/400" />
    </div>
  );
};

export default ThreeItemsBlock;
