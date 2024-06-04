import OneItemBlock from "@/components/oneItemBlock/oneItemBlock";
import TwoItemsBlock from "@/components/twoItemsBlock/twoItemsBlock";

export default function Home() {
  return (
    <main className="homePage">
      <TwoItemsBlock />
      <OneItemBlock />
      <TwoItemsBlock />
      <TwoItemsBlock />
      <OneItemBlock />
    </main>
  );
}
