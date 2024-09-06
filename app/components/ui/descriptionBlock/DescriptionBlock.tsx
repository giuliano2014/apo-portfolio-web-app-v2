import styles from "./descriptionBlock.module.css";

type DescriptionBlockProps = {
  description: string;
};

const DescriptionBlock = ({ description }: DescriptionBlockProps) => {
  console.log(description);
  const formattedText = description.replace(/\n/g, "<br />");
  return (
    <div className={styles.wrapper}>
      <p>Description</p>
      <p>{description}</p>
      <div dangerouslySetInnerHTML={{ __html: formattedText }} />
    </div>
  );
};

export default DescriptionBlock;
