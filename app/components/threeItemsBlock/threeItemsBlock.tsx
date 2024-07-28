import Card from "@/components/ui/card/card";
import styles from "./threeItemsBlock.module.css";

//@TODO: Add types
const ThreeItemsBlock = ({
  heights,
  urls,
  widths,
}: {
  heights: number[];
  urls: string[];
  widths: number[];
}) => {
  return (
    <div className={styles.wrapper}>
      <Card height={200} url="https://placeholderimage.eu/api/300/400" width={300} />
      <Card height={200} url="https://placeholderimage.eu/api/300/400" width={300} />
      <Card height={200} url="https://placeholderimage.eu/api/300/400" width={300} />
    </div>
  );
};

export default ThreeItemsBlock;
