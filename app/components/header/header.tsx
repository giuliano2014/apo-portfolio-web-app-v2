import Navbar from "@/components/navbar";
import styles from "./header.module.css";

const Header = () => {
  return (
    <header className={styles.wrapper}>
      <Navbar />
    </header>
  );
};

export default Header;
