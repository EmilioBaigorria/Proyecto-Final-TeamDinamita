import { ICreateSucursal } from "../types/dtos/sucursal/ICreateSucursal";
import { ISucursal } from "../types/dtos/sucursal/ISucursal";
import { IUpdateSucursal } from "../types/dtos/sucursal/IUpdateSucursal";
import { BackendClient } from "./BackendClient";

export class SucursalService extends BackendClient<ISucursal|IUpdateSucursal | ICreateSucursal> {
    async updateSucursal(id: number, data: IUpdateSucursal): Promise<ISucursal|IUpdateSucursal | ICreateSucursal> {
        return await this.put(id, data);
      }
    
}
