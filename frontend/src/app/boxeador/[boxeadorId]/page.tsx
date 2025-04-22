import styles from './index.module.css'
import Photo from './ficha_tecnica/Photo'
import Information from './ficha_tecnica/Information'
import Record from './ficha_tecnica/Record'

async function loadBoxeador(id: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/boxeador/${id}/`);
  const data = await res.json();
  return data;
}

export default async function BoxeadorID({ params }: {params : Promise<{boxeadorId: string}>}) {
  const { boxeadorId } = await params;
  const data = await loadBoxeador(boxeadorId);

  return (
    <main className={styles.fichaTecnica}>
      <section className={styles.fichaTecnica__boxeador}>
        <Record />
        <Photo  estado={data.status} alt={`${data.nombre} ${data.apellido}`} />
        <Information data={data} />
      </section>

      <section className={styles.fichaTecnica__combates}></section>
    </main>
  );
}
