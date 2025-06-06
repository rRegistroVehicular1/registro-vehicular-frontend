export interface VehiculoInfo {
  tipo: string;
  llantas: number;
}

export type VehiculosMap = Record<string, VehiculoInfo>;
