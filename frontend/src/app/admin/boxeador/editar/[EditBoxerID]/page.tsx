import { BoxeadorInfo } from "@/app/lib/Boxeador";
import FormBoxer from "./FormBoxer";

async function loadBoxeador(id: string): Promise<BoxeadorInfo> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/boxeador/${id}/`
  );
  const data = await res.json();
  return data;
}

export default async function EditBoxer({
    params,
}:{
    params: Promise<{ EditBoxerID: string }>;
}) {
    const {EditBoxerID} = await params;
    const boxer:  BoxeadorInfo = await  loadBoxeador(EditBoxerID);
    
    return(
        <main>
            <FormBoxer boxer={boxer} />
        </main>
    )
}