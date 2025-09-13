export interface BoxeadorInfo {
  id: string;
  nombre: string;
  apellido: string;
  fecha_nacimiento: string;
  sexo: string;
  dni: string;
  n_licencia: string;
  provincia: string;
  localidad: string;
  debutaje: string;
  carrera: string;
  peso: string;
  divicion: string;
  status: string;
  altura: string;
  alcance: string;
  stance: string;
  boxer_foto: string;

  combates_stats: {
    total: number;
    total_rounds: number;
    porcentaje_KO: number;

    total_sin_decision: number;
    total_victorias: number;
    total_derrotas: number;
    total_empates: number;
  }
}
