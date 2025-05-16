export interface BoxeadorInfo {
  id: string;
  nombre: string;
  apellido: string;
  fecha_nacimiento: string;
  sexo: string;
  dni: string;
  numero_licencia: string;
  nacionalidad: string;
  provincia: string;
  localidad: string;
  debutaje: string;
  carrera: string;
  peso: string;
  divicion: string;
  status: string;
  combate: string;
  combates: Combate[];
  rounds: string;
  KOs: string;
  altura: string;
  alcance: string;
  stance: string;
  victorias: string;
  derrotas: string;
  empates: string;
  sin_definir: string;
  total_victorias: number;
  total_derrotas: number;
  total_empates: number;
  total_sin_decision: number;
  foto: string;
}

export interface Combate {
  id: string;
  boxeador: {
    id: string;
    nombre: string;
    apellido: string;
  };
  rival: {
    id: string;
    nombre: string;
    apellido: string;
  };
  fecha: string;
  peso: number;
  lugar: string;
  resultados: string;
  rounds: number;
  historial: string;
  ultimas_6: string;
}
