import TextLines from "@/components/ui/TextLines";
import styles from "./textBloc.module.css";

type TextBlocProps = {
  surtitle?: string;
  text?: string;
  title?: string;
};

const TextBloc = ({ surtitle, text, title }: TextBlocProps) => {
  return (
    <div className={styles.wrapper}>
      <h2>{surtitle}</h2>
      <h3>{title}</h3>
      {text && <TextLines text={text} />}
    </div>
  );
};

export default TextBloc;
