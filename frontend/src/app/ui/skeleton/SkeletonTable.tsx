import styles from "./index.module.css";
import stylesTables from "@/app/styles/table.module.css";

export default function TableSkeleton() {
  return (
    <>
      <tr>
        <td ><div className={`${styles.skeleton} ${styles.avatar}`}></div></td>
        <td className={stylesTables.person}>
          <div className={`${styles.skeleton} ${styles.text}`}></div>
        </td>
        <td><div className={`${styles.skeleton} ${styles.text}`}></div></td>
        <td><div className={`${styles.skeleton} ${styles.text}`}></div></td>
        <td><div className={`${styles.skeleton} ${styles.text}`}></div></td>
        <td><div className={`${styles.skeleton} ${styles.text}`}></div></td>
        <td><div className={`${styles.skeleton} ${styles.text}`}></div></td>
        <td><div className={`${styles.skeleton} ${styles.text}`}></div></td>
        <td className={stylesTables.person}>
          <div className={`${styles.skeleton} ${styles.avatar}`}> </div>

          <div className={`${styles.skeleton} ${styles.avatar}`}> </div>
        </td>
      </tr>
    </>
  );
}
