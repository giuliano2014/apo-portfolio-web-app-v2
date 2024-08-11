import styles from "./textBloc.module.css";

type TextBlocProps = {
  surtitle?: string;
  text?: string;
  title?: string;
};

const TextBloc = ({ surtitle, text, title }: TextBlocProps) => {
  return (
    <div className={styles.wrapper}>
      <p>{surtitle}</p>
      <p>{title}</p>
      <p>{text}</p>
    </div>
  );
};

export default TextBloc;
