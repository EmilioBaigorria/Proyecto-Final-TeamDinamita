import { ICreateSucursal } from "../types/dtos/sucursal/ICreateSucursal";
import { ISucursal } from "../types/dtos/sucursal/ISucursal";
import { IUpdateSucursal } from "../types/dtos/sucursal/IUpdateSucursal";
import { BackendClient } from "./BackendClient";

export class SucursalService extends BackendClient<ISucursal|IUpdateSucursal | ICreateSucursal> {
    async updateSucursal(id: number, data: IUpdateSucursal): Promise<ISucursal|IUpdateSucursal | ICreateSucursal> {
      this.baseUrl=this.baseUrl+"/sucursales/update"
        return await this.put(id, data);
      }
      async sucursalPorEmpresa(id: number): Promise<ISucursal|IUpdateSucursal | ICreateSucursal | null> {
        this.baseUrl=this.baseUrl+"/sucursales/porEmpresa"
        const rep=await this.getById(id)
        if(rep){
          return rep
        }else{
          return null
        }
        
        }
      
    
}
