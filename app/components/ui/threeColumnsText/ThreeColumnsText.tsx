import styles from "./threeColumnsText.module.css";

type ThreeColumnsTextProps = {
  brand: string;
  tools: string[];
  year: string;
};

const ThreeColumnsText = ({ brand, tools, year }: ThreeColumnsTextProps) => {
  const formattedTools = tools.map((tool) => `${tool}. `).join("");

  return (
    <div className={styles.wrapper}>
      <div>
        <p className={styles.label}>Marque</p>
        <h2 className={styles.text}>{brand}</h2>
      </div>
      <div>
        <p className={styles.label}>Année</p>
        <h2 className={styles.text}>{year}</h2>
      </div>
      <div>
        <p className={styles.label}>Outils</p>
        <h2 className={styles.text}>{formattedTools}</h2>
      </div>
    </div>
  );
};

export default ThreeColumnsText;
