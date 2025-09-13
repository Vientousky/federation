export interface BoxeadorInfo {
  id: string;
  nombre: string;
  apellido: string;
  nacimiento: string;
  sexo: string;
  dni: string;
  licencia: string;
  vencimiento:string;
  provincias: string;
  localidad: string;
  peso: string;
  division: string;
  estado: string;
  altura: string;
  alcance: string;
  postura_combate: string;
  foto_boxeador: string;
  entrenador: string | null;

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

export interface BoxerStatistics {
  total_boxeadores:number;
  activos:number;
  inactivos:number;
  suspendidos:number;
  retirados:number;
}