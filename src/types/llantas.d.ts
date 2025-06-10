export interface Llanta {
  id: number;
  nombre: string;
  posicion: string; // 'delantera', 'trasera', 'extra'
  lado: 'izquierda' | 'derecha' | 'central'; 
  fp: boolean;    // Falta presión
  pe: boolean;    // Presión excesiva
  pa: boolean;    // Presión adecuada
  desgaste: boolean;
}

// Alias para compatibilidad
export type Llantas = Llanta;
