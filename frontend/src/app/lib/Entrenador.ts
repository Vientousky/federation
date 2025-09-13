export interface TrainerInfo {
  id: string;
  nombre: string;
  apellido: string;
  sexo: string;
  dni: string;
  licencia: string;
  vencimiento: string;
  cargo: string;
  provincias: string;
  localidad: string;
  foto_entrenador: string;
}

export interface TrainerStatistics {
  total_entrenador: number;

  cargos: {
    director_tecnico: number;
    entrenador_principal:number;
    preparador_fisico: number;
    segundo_entrenador:number;
    cutman:number;
    nutricionista: number;
    psicologo:number;
    manager:number;
    asistente_tecnico:number;
    kinesiologo:number;
    sparring:number;
    analista:number;
  };
}
