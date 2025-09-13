import { BsPlusLg } from "react-icons/bs";
import styles from "./crearLink.module.css";
import Link from "next/link";

type CrearLinkProps = {
  href: string;
  name: string;
  label: string;
};

export default function CrearLink({ href, name, label }: CrearLinkProps) {
  return (
    <Link href={href} aria-label={label} className={styles.link} >
      {name}
      <BsPlusLg />
    </Link>
  );
}
