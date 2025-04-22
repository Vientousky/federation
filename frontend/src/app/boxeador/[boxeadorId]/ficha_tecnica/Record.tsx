import styles from '../index.module.css'


const Record: React.FC = () => {
  return (
    <div className={styles.record}>
      <article className={`${styles.card} ${styles.victorias}`}>
        <h3>Victorias</h3>
        <h1>00</h1>
        <p>00 KOs</p>
      </article>

      <article className={`${styles.card} ${styles.derrotas}`}>
        <h3>Derrota</h3>
        <h1>00</h1>
        <p>00 KOs</p>
      </article>

      <article className={`${styles.card} ${styles.empates}`}>
        <h3>Empates</h3>
        <h1>00</h1>
        <p>00 KOs</p>
      </article>

      <article className={`${styles.card} ${styles.sinDecicion}`}>
        <h3>Sin decición</h3>
        <h1>00</h1>
        <p>00 KOs</p>
      </article>
    </div>
  );
};

export default Record;
