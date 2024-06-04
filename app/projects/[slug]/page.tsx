import OneItemBlock from "@/components/oneItemBlock/oneItemBlock";
import ThreeItemsBlock from "@/components/threeItemsBlock/threeItemsBlock";
import TwoItemsBlock from "@/components/twoItemsBlock/twoItemsBlock";
import styles from "./page.module.css";

export default function Page({ params }: { params: { slug: string } }) {
  return (
    <div className={styles.projectPage}>
      <div>My project: {params.slug}</div>
      <ThreeItemsBlock />
      <TwoItemsBlock />
      <OneItemBlock />
    </div>
  );
}
