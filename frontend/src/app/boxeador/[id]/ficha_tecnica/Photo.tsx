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
            <img src={src} alt={alt} className={className} />
            <figcaption>
                <h1>{alt}</h1>
                <p className={styles[estado]}>{estado}</p>
            </figcaption>
        </figure>

        // este es un componente que recibe una foto un alt y un estadao y luego lo muestra 
    );
};

export default Photo;