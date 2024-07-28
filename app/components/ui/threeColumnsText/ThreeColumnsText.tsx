import styles from "./threeColumnsText.module.css";

type ThreeColumnsTextProps = {
  brand: string;
  tools: string;
  year: string;
};

const ThreeColumnsText = ({ brand, tools, year }: ThreeColumnsTextProps) => {
  return (
    <div className={styles.wrapper}>
      <div>
        <p>Marque</p>
        <h2>{brand}</h2>
      </div>
      <div>
        <p>Année</p>
        <h2>{year}</h2>
      </div>
      <div>
        <p>Outils</p>
        <h2>{tools}</h2>
      </div>
    </div>
  );
};

export default ThreeColumnsText;
