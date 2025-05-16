import React from 'react';
import styles from './home.module.css'

const Welcome: React.FC = () => {
    return (
        <section className={styles.welcome}>

            <div className={styles.welcome__container}>
            <h1>¡Bienvenido a la <strong>Federación Chaqueña de BOX!</strong> </h1>
            <p>¡Buscás algo o necesitás información sobre un boxeador? ¡Acá la encontrás!</p>
            </div>
        </section>
    );
};

export default Welcome;