export interface Llanta {
  id: number;
  nombre: string;
  posicion: 'delantera' | 'trasera' | 'extra-delantera' | 'extra-trasera' | 'central';
  lado: 'izquierda' | 'derecha';
  fp: boolean;    // Falta presión
  pe: boolean;    // Presión excesiva
  pa: boolean;    // Presión adecuada
  desgaste: boolean;
}

// Posiciones posibles para las llantas
export type PosicionLlanta = 
  | 'delantera-izquierda' 
  | 'delantera-derecha'
  | 'extra-delantera-izquierda'
  | 'extra-delantera-derecha'
  | 'trasera-izquierda'
  | 'trasera-derecha'
  | 'extra-trasera-izquierda'
  | 'extra-trasera-derecha'
  | 'central-izquierda'
  | 'central-derecha';

// Configuración de llantas por cantidad
export type ConfiguracionLlantas = {
  4: [1, 2, 5, 7];                          // Para vehículos con 4 llantas
  6: [1, 2, 5, 6, 7, 8];                    // Para vehículos con 6 llantas 
  10: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];      // Para vehículos con 10 llantas
};

// Tipo para las opciones de presión/desgaste
export type EstadoLlanta = {
  fp: boolean;
  pe: boolean;
  pa: boolean;
  desgaste: boolean;
};

// Alias para compatibilidad
export type Llantas = Llanta;
