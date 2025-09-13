import { TrainerInfo } from "@/app/lib/Entrenador";
import FormTrainer from "./FormTrainer";

async function loadTrainer(id: string): Promise<TrainerInfo> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/entrenador/${id}/`
  );
  const data = await res.json();
  return data;
}

export default async function EditTrainer({
  params,
}: {
  params: Promise<{ EditTrainerID: string }>;
}) {
  const { EditTrainerID } = await params;
  const trainer: TrainerInfo = await loadTrainer(EditTrainerID);

  return (
    <main>
      <FormTrainer trainer={trainer} />
    </main>
  );
}
