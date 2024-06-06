import OneItemBlock from "@/components/oneItemBlock/oneItemBlock";
import TwoItemsBlock from "@/components/twoItemsBlock/twoItemsBlock";
import styles from "./page.module.css";

export default function Home() {
  return (
    <main className={styles.homePage}>
      <TwoItemsBlock />
      <OneItemBlock />
      <TwoItemsBlock />
      <TwoItemsBlock />
      <OneItemBlock />
    </main>
  );
}
