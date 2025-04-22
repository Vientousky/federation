import styles from "../index.module.css";

interface PhotoProps {
  alt: string;
  estado: string;
}

const Photo: React.FC<PhotoProps> = ({ alt, estado }) => {
  
  return (
    <figure className={styles.portada}>
      <img
        src="/img/default.jpeg"
        alt={alt ?? "Imagen por defecto"}
        width={200}
        height={400}
      />
      <figcaption className={styles.portada__caption}>
        <h2>{alt}</h2>
        <p className={styles[estado]}>{estado}</p>
      </figcaption>
    </figure>
  );
};

export default Photo;
