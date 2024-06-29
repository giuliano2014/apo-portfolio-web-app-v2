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
        <h2>Soi Paris</h2>
      </div>
      <div>
        <p>Année</p>
        <h2>2023</h2>
      </div>
      <div>
        <p>Outils</p>
        <h2>PS AI ID</h2>
      </div>
    </div>
  );
};

export default ThreeColumnsText;
