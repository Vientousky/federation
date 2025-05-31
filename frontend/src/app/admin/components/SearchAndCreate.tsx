"use client";

// import { useState, useEffect } from "react";
import { BsSearch } from "react-icons/bs";
import styles from "@/app/styles/searchCreate.module.css";
import Link from "next/link";

interface Props {
  href: string;
  name: string;

  placeholder: string;
  // onSearch: (query: string) => void;
}

export default function SearchAndCreate({
  href,
  name,
  placeholder,
  // onSearch,
}: Props) {
  // const [query, setQuery] = useState("");

  // useEffect(() => {
  //   const delayDebounce = setTimeout(() => {
  //     onSearch(query);
  //   }, 150); 

  //   return () => clearTimeout(delayDebounce);
  // }, [query, onSearch]);

  return (
    <>
      <article className={styles.search}>
         <form onSubmit={(e) => e.preventDefault()}>
          <BsSearch />
          <input
            type="search"
            placeholder={placeholder}
            // value={query}
            // onChange={(e) => setQuery(e.target.value)}
          />
        </form>
      </article>

      <article className={styles.create}>
        <Link className={styles.link} href={href}>
          {" "}
          {name}
        </Link>
      </article>
    </>
  );
}
