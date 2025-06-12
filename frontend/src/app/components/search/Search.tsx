import { BsSearch} from "react-icons/bs";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import styles from "./search.module.css";

type SearchProps = {
  placeholder:string;
  onChange: (value: string) => void;
};

export default function Search({  onChange, placeholder }: SearchProps) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSearch = (term: string) => {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set("query", term);
    } else {
      params.delete("query");
    }
    replace(`${pathname}?${params.toString()}`);
    onChange(term);
  };

  return (
    <article className={styles.search}>
        <BsSearch className={styles.search_form_svg} />
        <input
          type="search"
          placeholder={placeholder}
          onChange={(e) => handleSearch(e.target.value)}
          defaultValue={searchParams.get("query")?.toString()}
          className={styles.search_form_input}
        />
    </article>
  );
}
