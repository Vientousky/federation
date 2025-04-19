import { BoxeadorInfo } from '../interface';

interface InformationProps {
  data: BoxeadorInfo;  // define los datos que recibe el componente
}


const Information: React.FC<InformationProps> = ({data}) => {

  const infoBoxer = [
    { nombre: "Sexo", value: data.sexo },
    { nombre: "Peso", value: data.peso },
    { nombre: "DNI", value: data.dni },
    { nombre: "Numero Licencia", value: data.numero_licencia },
    { nombre: "Nacionalidad", value: data.nacionalidad },
    { nombre: "Provincia", value: data.provincia },
    { nombre: "Localidad", value: data.localidad },
    { nombre: "Debutaje", value: data.debutaje },
    { nombre: "Carrera", value: data.carrera },
    { nombre: "División", value: data.divicion },
    { nombre: "Combates", value: data.combates },
    { nombre: "Rounds", value: data.rounds },
    { nombre: "KOs", value: data.KOs },
    { nombre: "Alcance", value: data.alcance },
    { nombre: "Stance", value: data.stance },
  ];

  return (
    <div>
    {infoBoxer.map((item, index) => (
      <article key={index}>
        <h3>{item.nombre}</h3>
        <p>{item.value}</p>
      </article>
    ))}
  </div>
  );
};

export default Information;
