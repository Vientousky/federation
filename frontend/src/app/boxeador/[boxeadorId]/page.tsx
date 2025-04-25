async function loadBoxeador(id: string) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/boxeador/${id}/`);
    const data = await res.json();
    return data;
}

export default async function BoxeadorDetail({params}: {params: Promise<{boxeadorId: string}>}) {
    const { boxeadorId } = await params;
    const boxeador = await loadBoxeador(boxeadorId);

    return (
        <main>
            <h1>Perfil {boxeadorId}</h1>
            <div>
                <h2>{boxeador.nombre}</h2>
                <p>{boxeador.descripcion}</p>
            </div>
        </main>
    );
}
