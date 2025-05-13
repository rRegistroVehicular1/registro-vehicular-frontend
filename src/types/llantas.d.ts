export interface Llanta {
  id: number;
  nombre: string;
  posicion: 'delantera' | 'trasera' | 'extra';
  lado: 'izquierda' | 'derecha' | 'central';
  fp: boolean;
  pe: boolean;
  pa: boolean;
  desgaste: boolean;
  presion?: number;
  observacion?: string;
}

// Alias para compatibilidad
export type Llantas = Llanta;
