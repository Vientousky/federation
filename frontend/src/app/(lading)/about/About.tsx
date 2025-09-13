import styles from "./about.module.css";

type PersonaProps = {
  avatar: string;
  titulo: string;
  descripcion: string;
  class:string;
};

export default function About() {
  const persona: PersonaProps[] = [
    {
      avatar: "img/default.jpeg",
      titulo: "Vicepresidente",
      descripcion: "Un boxeo que nos indentifica como chaqueños",
      class:'persona1',
    },
    {
      avatar: "img/default.jpeg",
      titulo: "Precidente FBC",
      descripcion: "EL boxeo es una forma de vida",
      class:'persona2',
    },
    {
      avatar: "img/default.jpeg",
      titulo: "Organizador",
      descripcion: "Los Chaqueños tenemos que demostrar quienes somos",
      class:'persona3',
    },
  ];
  return (
    <section className={`${styles.about} wrapper`}>
      {persona.map((item, index) => (
        <article className={`${styles.aboutItem} ${styles[item.class]}`} key={index}>
          <div className={styles.avatar}></div>

          <div className={styles.info}>
            <h2>{item.titulo}</h2>
            <p>{item.descripcion} </p>
          </div>
        </article>
      ))}
    </section>
  );
}
