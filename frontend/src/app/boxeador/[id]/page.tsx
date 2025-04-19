import styles from './index.module.css'

import Information from './ficha_tecnica/Information'
import Record from './ficha_tecnica/Record'
import Photo from './ficha_tecnica/Photo'



async function loadBoxeador(id: string) {
  const res = await fetch(`${process.env.BACKEND_URL}/boxeador/${id}/`);
  const data = await res.json();
  return data;
}

type PageProps = {
  params: {
    id: string;
  };
};

async function Page({ params }: PageProps) {
  const data = await loadBoxeador(params.id);

  return (
    <main className={styles.fichaTecnica}>
      <section className={styles.fichaTecnica__boxeador}>
        <Record />
        <Photo
          src={data.foto}
          alt={`${data.nombre} ${data.apellido}`}
          estado={data.status}
        />
        <Information data={data} />
      </section>

      <section className={styles.fichaTecnica__combates}></section>
    </main>
  );
}

 export default Page;