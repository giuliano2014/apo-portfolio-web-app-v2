import TextLines from "@/components/ui/textLines/TextLines";
import styles from "./descriptionBlock.module.css";

type DescriptionBlockProps = {
  description: string;
};

const DescriptionBlock = ({ description }: DescriptionBlockProps) => {;
  return (
    <div className={styles.wrapper}>
      <p>Description</p>
      <p>{description}</p>
      <TextLines text={description} />
    </div>
  );
};

export default DescriptionBlock;
