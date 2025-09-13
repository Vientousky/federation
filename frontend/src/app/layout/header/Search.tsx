import { TbSearch } from "react-icons/tb";
import styles from "./index.module.css";

const Search: React.FC = () => {

  return (
    <>
      <form className={styles.searchContainer}>
        <TbSearch className={styles.searchIcon} />
        <input
          type="search"
          placeholder="Search..."
          className={styles.searchInput}
          aria-label="Search"
        />
      </form>
    </>
  );
};

export default Search;
