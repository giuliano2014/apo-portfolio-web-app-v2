import styles from "./textLines.module.css";

const TextLines = ({ text }: { text: string }): JSX.Element => {
  const symbol = "\n";
  const hasLineBreaks = text.includes(symbol);

  return (
    <>
      {hasLineBreaks ? (
        text.split(symbol).map((line: string, index: number) => (
          <p className={styles.text} key={index}>
            {line}
          </p>
        ))
      ) : (
        <p className={styles.text}>{text}</p>
      )}
    </>
  );
};

export default TextLines;
