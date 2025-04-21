import styles from '../index.module.css'

interface PhotoProps {
    src: string;
    alt: string;
    estado: string;
    className?: string;
}

const Photo: React.FC<PhotoProps> = ({ src, alt, className, estado }) => {
    return (
        <figure>
            <img src={src || '/public/img/default.jpeg'} alt={alt ?? 'Imagen por defecto'} className={className} width={200} height={400} />
            <figcaption>
                <h1>{alt}</h1>
                <p className={styles[estado]}>{estado}</p>
            </figcaption>
        </figure>
    );
};

export default Photo;