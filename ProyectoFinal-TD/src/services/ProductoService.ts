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

    async createProducto(data:ICreateProducto):Promise<ICreateProducto>{
        const response=await fetch(`${this.baseUrl}/articulos/create`,{
            method:"POST",
            headers: {
                "Content-Type": "application/json",
            },
            body:JSON.stringify(data)
        })
        const newData=await response.json()
        return newData as ICreateProducto
    }
    async updateProducto(id:number, data:IUpdateProducto):Promise<IUpdateProducto>{
        const response=await fetch(`${this.baseUrl}/articulos/update/${id}`,{
            method:"PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body:JSON.stringify(data)
        })
        const newData=await response.json()
        return newData as IUpdateProducto
    }
    async deleteProducto(id:number):Promise<void>{
        const response=await fetch(`${this.baseUrl}/articulos/${id}`,{
            method:"DELETE",
        })
        if(!response.ok){
            throw new Error(`Error al eliminar el producto con ID ${id}`)
        }
    }
}