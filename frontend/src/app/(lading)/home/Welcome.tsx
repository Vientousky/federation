import React from 'react';
import styles from './home.module.css'
import { BsMouse } from "react-icons/bs";


const Welcome: React.FC = () => {
    return (
        <section className={styles.welcome}>
            <div className={styles.welcomeContainer}>
            <h1 className={styles.containerTitulo}>¡Bienvenido a la <strong>Federación Chaqueña de BOX!</strong> </h1>
            <p className={styles.containerSubtitulo}>¡Buscás algo o necesitás información sobre un boxeador? ¡Acá la encontrás!</p>
            </div>

            <BsMouse className={styles.welcomeScroll}/>
        </section>
    );
};

export default Welcome;