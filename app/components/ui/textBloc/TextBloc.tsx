import styles from "./textBloc.module.css";

type TextBlocProps = {
  surtitle?: string;
  text?: string;
  title?: string;
};

const TextBloc = ({ surtitle, text, title }: TextBlocProps) => {
  const formattedText = text?.replace(/\n/g, "<br />");
  return (
    <div className={styles.wrapper}>
      <p>{surtitle}</p>
      <p>{title}</p>
      <p>{text}</p>
      {formattedText && (
        <div dangerouslySetInnerHTML={{ __html: formattedText }} />
      )}
    </div>
  );
};

export default TextBloc;
