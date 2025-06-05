export interface Llanta {
  id: number;
  nombre: string;
  posicion: 'delantera' | 'trasera' | 'extra-delantera' | 'extra-trasera' | 'central';
  lado: 'izquierda' | 'derecha' | 'central';
  fp: boolean;    // Falta presión
  pe: boolean;    // Presión excesiva
  pa: boolean;    // Presión adecuada
  desgaste: boolean;
}

// Alias para compatibilidad
export type Llantas = Llanta;
