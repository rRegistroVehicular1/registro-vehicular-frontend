export interface Llanta {
  id: number;
  nombre: string;
  posicion: 'delantera' | 'trasera' | 'central' | 'extra' | 'refuerzo';
  lado: 'izquierda' | 'derecha' | 'central';
  fp: boolean;    // Falta presión
  pe: boolean;    // Presión excesiva
  pa: boolean;    // Presión adecuada
  desgaste: boolean;
  observacion?: string; // Opcional para comentarios
}

// Posiciones estándar para diferentes configuraciones
export type ConfiguracionLlantas = {
  4: [1, 2, 5, 7];       // Sedán/Pickup básico
  6: [1, 2, 5, 6, 7, 8]; // Camión con ejes extras
  10: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] // Configuración completa
};

// Mapeo detallado de posiciones
export const PosicionesLlantas: Record<number, { posicion: string, lado: string }> = {
  1: { posicion: 'delantera', lado: 'izquierda' },
  2: { posicion: 'delantera', lado: 'derecha' },
  3: { posicion: 'central', lado: 'izquierda' },
  4: { posicion: 'central', lado: 'derecha' },
  5: { posicion: 'trasera', lado: 'derecha' },
  6: { posicion: 'extra', lado: 'derecha' },
  7: { posicion: 'trasera', lado: 'izquierda' },
  8: { posicion: 'extra', lado: 'izquierda' },
  9: { posicion: 'refuerzo', lado: 'izquierda' },
  10: { posicion: 'refuerzo', lado: 'derecha' }
};

// Alias para compatibilidad
export type Llantas = Llanta;
