import { ICreateProducto } from "../types/dtos/productos/ICreateProducto";
import { IProductos } from "../types/dtos/productos/IProductos";
import { IUpdateProducto } from "../types/dtos/productos/IUpdateProducto";
import { BackendClient } from "./BackendClient";

export class ProductoService extends BackendClient<IProductos|ICreateProducto|IUpdateProducto>{
    async pagedArticulosPorSucursal(idSucursal:number):Promise<IProductos[]|null>{
        const response=await fetch(`${this.baseUrl}/articulos/pagedPorSucursal/${idSucursal}?page=1&size=10`)
        if(!response.ok){
            return null
        }
        const data=await response.json()
        return data as IProductos[]
    }
    async articulosPorSucursalId(idSucursal:number):Promise<IProductos[]|null> {
        const response=await fetch(`${this.baseUrl}/articulos/porSucursal/${idSucursal}`)
        if(!response.ok){
            return null
        }
        const data=await response.json()
        return data as IProductos[]
    }
    async productoPorId(idArticulo:number):Promise<IProductos|null> {
        const response=await fetch(`${this.baseUrl}/articulos/${idArticulo}`)
        if(!response.ok){
            return null
        }
        const data=await response.json()
        return data as IProductos
    }
}