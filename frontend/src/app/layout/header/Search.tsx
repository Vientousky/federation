"use client";

import { useState, useEffect } from "react";
import { TbSearch } from "react-icons/tb";
import styles from "./index.module.css";

const Search: React.FC = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<any>([]);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
        if (query.trim() !== '') {
            fetch(`/api/busqueda?q=${query}`) 
                .then(res => res.json())
                .then(data => {
                    setResults(data.boxeadores); 
                });
        } else {
            setResults([]);
        }
    }, 300);

    return () => clearTimeout(delayDebounceFn);
}, [query]);

  return (
    <>
      <form className={styles.search_container}>
        <TbSearch />
        <input
          type="search"
          placeholder="Search..."
          className={styles.search_input}
          aria-label="Search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </form>

      {results.length > 0 && (
        <div className={styles.search_results}>
          {results.map((result: any) => (
            <div key={result.id} className={styles.search_result}>
              <h3>{result.nombre}</h3>
              <p>{result.tipo}</p>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default Search;
