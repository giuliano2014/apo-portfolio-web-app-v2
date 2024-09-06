import TextLines from "@/components/ui/TextLines";
import styles from "./descriptionBlock.module.css";

type DescriptionBlockProps = {
  description: string;
};

const DescriptionBlock = ({ description }: DescriptionBlockProps) => {
  return (
    <div className={styles.wrapper}>
      <p>Description</p>
      <TextLines text={description} />
    </div>
  );
};

export default DescriptionBlock;
