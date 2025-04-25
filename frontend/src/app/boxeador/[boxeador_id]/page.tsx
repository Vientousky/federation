
async function loadBoxeador(id: string) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/boxeador/${id}/`);
    const data = await res.json();
    return data;
  }
  
  export default async function BoxeadorID({ params }: {params : Promise<{boxeadorId: string}>}) {
    const { boxeadorId } = await params;
    const data = await loadBoxeador(boxeadorId);

  return (
    <main>
      <section>
        <h1>Boxeador</h1>
        <h2>{data.nombre}</h2>
      </section>
    </main>
  );
}
