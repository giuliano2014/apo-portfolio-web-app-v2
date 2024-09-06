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
      <p>{surtitle}</p>
      <p>{title}</p>
      <p>{text}</p>
      {text && <TextLines text={text} />}
    </div>
  );
};

export default TextBloc;
