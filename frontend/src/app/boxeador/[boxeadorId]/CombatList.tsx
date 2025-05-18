import { Combate } from "@/app/data/Boxeador";

type Props = {
  combate:  Combate;
};

export default function CombatList( {combate}: Props) {
  return (
    <tr >
      <td>{new Date(combate.fecha).toLocaleDateString()}</td>
      <td>{combate.peso}</td>
      <td>{`${combate.boxeador.nombre} ${combate.boxeador.apellido}`}</td>
      <td>{combate.lugar}</td>
      <td>{combate.resultados}</td>
      <td>{combate.rounds}</td>
    </tr>
  );
}
