import { TrainerInfo } from "../data/Entrenador";
import styles from "../styles/entrenador.module.css";
import Link from "next/link";
import Image from "next/image";

type TrainerProps={
  trainer:TrainerInfo;
  link:string;
}

export default function Entrenador({trainer , link}:TrainerProps) {
  return (
    <article className={styles.entrenador}>
      <header className={styles.header}>
        <figure className={styles.foto}>
          <Image
            src={trainer.trainer_foto || "/img/default.jpeg"}
            alt={trainer.nombre}
            width={125}
            height={125}
            style={{viewTransitionName:trainer.apellido,}}
          />
        </figure>

        <section className={styles.info}>
          <div className={styles.nombre}>
            <h2>{trainer.nombre} {trainer.apellido}</h2>
          </div>

          <div className={styles.datos}>
            <section className={styles.card}>
              <span>Edad:</span> <span>31 años</span>
            </section>
            <section className={styles.card}>
              <span>Nacimiento:</span> <span></span>
            </section>
            <section className={styles.card}>
              <span>Licencia:</span> <span>{trainer.n_licencia}</span>
            </section>
            <section className={styles.card}>
              <span>Carrera:</span> <span>+6 años</span>
            </section>
          </div>
        </section>
      </header>

      <footer className={styles.footer}>
        
          <section className={styles.locationSection}>
            <span className={styles.flagContainer}>
              <Image
                src="/flags/saenz.png"
                alt="Bandera de Sáenz Peña"
                width={30}
                height={20}
              />
            </span>
            <strong className={styles.cityName}>{trainer.localidad} </strong>
          </section>

          <section className={styles.actionSection}>
            <Link className={styles.moreLink} href={link}>
              IR asu perfil
            </Link>
          </section>
        </footer>

    </article>
  );
}
