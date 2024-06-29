import OneItemBlock from "@/components/oneItemBlock/oneItemBlock";
import ThreeItemsBlock from "@/components/threeItemsBlock/threeItemsBlock";
import TopProjectBlock from "@/components/topProjectBlock/topProjectBlock";
import TwoItemsBlock from "@/components/twoItemsBlock/twoItemsBlock";
import styles from "./page.module.css";

export default function Page({ params }: { params: { slug: string } }) {
  return (
    <main className={styles.projectPage}>
      {/* <div>My project: {params.slug}</div> */}
      <TopProjectBlock />
      <ThreeItemsBlock />
      <TwoItemsBlock />
      <OneItemBlock />
    </main>
  );
}
