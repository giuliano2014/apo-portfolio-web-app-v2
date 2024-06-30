import styles from "./descriptionBlock.module.css";

type DescriptionBlockProps = {
  description: string;
};

const DescriptionBlock = ({ description }: DescriptionBlockProps) => {
  return (
    <div className={styles.wrapper}>
      <p>Description</p>
      <p>{description}</p>
    </div>
  );
};

export default DescriptionBlock;