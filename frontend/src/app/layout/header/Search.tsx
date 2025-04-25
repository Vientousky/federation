import { TbSearch } from "react-icons/tb";
import styles from "./index.module.css";

const Search: React.FC = () => {

  return (
    <>
      <form className={styles.search_container}>
        <TbSearch />
        <input
          type="search"
          placeholder="Search..."
          className={styles.search_input}
          aria-label="Search"
        />
      </form>
    </>
  );
};

export default Search;
