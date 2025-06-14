export interface Llanta {
  id: number;
  nombre: string;
  posicion: 'delantera' | 'trasera' | 'extra-delantera' | 'extra-trasera' | 'central';
  lado: 'izquierda' | 'derecha' | 'central';
  fp: boolean;    // Falta presión
  pe: boolean;    // Presión excesiva
  pa: boolean;    // Presión adecuada
  desgaste: boolean;
  observacion?: string; // Opcional para observaciones específicas
}

// Posiciones completas para referencia:
// 1 - Delantera Izquierda (delantera, izquierda)
// 2 - Delantera Derecha (delantera, derecha)
// 3 - Extra Delantera Izquierda (extra-delantera, izquierda) [solo 10 llantas]
// 4 - Extra Delantera Derecha (extra-delantera, derecha) [solo 10 llantas]
// 5 - Trasera Derecha (trasera, derecha)
// 6 - Extra Trasera Derecha (extra-trasera, derecha) [6 y 10 llantas]
// 7 - Trasera Izquierda (trasera, izquierda)
// 8 - Extra Trasera Izquierda (extra-trasera, izquierda) [6 y 10 llantas]
// 9 - Central Izquierda (central, izquierda) [solo 10 llantas]
// 10 - Central Derecha (central, derecha) [solo 10 llantas]

// Configuraciones por cantidad de llantas:
// 4 llantas: [1, 2, 5, 7]
// 6 llantas: [1, 2, 5, 6, 7, 8]
// 10 llantas: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

// Alias para compatibilidad
export type Llantas = Llanta;
