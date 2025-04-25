import { BoxeadorInfo } from './interface'; // Asegúrate de importar la interfaz

async function loadBoxeador(id: string): Promise<BoxeadorInfo> {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/boxeador/${id}/`);
    const data = await res.json();
    return data;
}

export default async function BoxeadorDetail({ params }: { params: Promise<{ boxeadorId: string }> }) {
    const { boxeadorId } = await params;
    const boxeador: BoxeadorInfo = await loadBoxeador(boxeadorId);

    return (
        <main>
            <h1>Perfil {boxeadorId}</h1>
            <div>
                <h2>{boxeador.nombre} {boxeador.apellidos}</h2>
                <p>Fecha de nacimiento: {boxeador.fecha_nacimiento}</p>
                <p>Sexo: {boxeador.sexo}</p>
                {/* Agrega más detalles del boxeador aquí */}
            </div>
        </main>
    );
}
