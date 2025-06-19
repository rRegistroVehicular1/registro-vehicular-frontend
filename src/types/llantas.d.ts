// types/llantas.d.ts

export interface Llanta {
  id: number;
  nombre: string;
  posicion: PosicionLlantas;
  lado: LadoLlanta;
  fp: boolean;    // Falta presión
  pe: boolean;    // Presión excesiva
  pa: boolean;    // Presión adecuada
  desgaste: boolean;
  observacion?: string; // Opcional para comentarios adicionales
}

// Tipos para posiciones de llantas (expandido para 10 llantas)
export type PosicionLlantas = 
  | 'delantera' 
  | 'trasera' 
  | 'extra-delantera' 
  | 'extra-trasera' 
  | 'central'
  | 'extra-central';

// Tipos para lados de las llantas
export type LadoLlanta = 
  | 'izquierda' 
  | 'derecha' 
  | 'central';

// Tipo para mapeo de cantidad de llantas
export type CantidadLlantas = 4 | 6 | 10;

// Tipo para configuración de llantas por vehículo
export interface ConfiguracionLlantas {
  cantidad: CantidadLlantas;
  llantas: Llanta[];
}

// Alias para compatibilidad
export type Llantas = Llanta;

// Tipo para el mapeo de placas a cantidad de llantas
export type MapeoLlantasPorPlaca = Record<string, CantidadLlantas>;
