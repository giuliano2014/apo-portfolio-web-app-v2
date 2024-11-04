import TextLines from "@/components/ui/textLines/TextLines";
import styles from "./textBloc.module.css";

type TextBlocProps = {
  surtitle?: string;
  text?: string;
  title?: string;
};

const TextBloc = ({ surtitle, text, title }: TextBlocProps) => {
  return (
    <div className={styles.wrapper}>
      <h2 className={styles.surtitle}>{surtitle}</h2>
      <h3 className={styles.title}>{title}</h3>
      {text && <TextLines text={text} />}
    </div>
  );
};

export default TextBloc;
