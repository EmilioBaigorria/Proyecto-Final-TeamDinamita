import { IPais } from "./IPais";

export interface IProvincia {
  nombre: string;
  pais: IPais;
  id: number;
  eliminado?: boolean;
}
