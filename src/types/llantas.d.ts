export interface Llanta {
  id: number;
  nombre: string;
  posicion: string;
  lado: 'izquierda' | 'derecha' | 'central';
  fp: boolean;
  pe: boolean;
  pa: boolean;
  desgaste: boolean;
}

export type CantidadLlantas = 4 | 6 | 10;
