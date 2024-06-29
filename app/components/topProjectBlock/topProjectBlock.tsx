import Card from "@/components/ui/card/card";
import DescriptionBlock from "@/components/ui/descriptionBlock/DescriptionBlock";
import ThreeColumnsText from "@/components/ui/threeColumnsText/ThreeColumnsText";
import styles from "./topProjectBlock.module.css";

const TopProjectBlock = () => {
  return (
    <Card
      hashtag="Direction artistique"
      title="Los Angeles"
      url="https://placeholderimage.eu/api/300/400"
    >
      <div className={styles.wrapper}>
        <ThreeColumnsText brand="Soi Paris" tools="PS AI ID" year="2023" />
        <DescriptionBlock description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique." />
      </div>
    </Card>
  );
};

export default TopProjectBlock;
