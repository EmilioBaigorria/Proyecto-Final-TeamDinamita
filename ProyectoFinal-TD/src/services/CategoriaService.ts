import { ICategorias } from "../types/dtos/categorias/ICategorias";
import { ICreateCategoria } from "../types/dtos/categorias/ICreateCategoria";
import { IUpdateCategoria } from "../types/dtos/categorias/IUpdateCategoria";
import { BackendClient } from "./BackendClient";

export class CategoriaService extends BackendClient<ICreateCategoria | ICategorias | IUpdateCategoria>{
    async updateCategoria(id:number, data:IUpdateCategoria):Promise<IUpdateCategoria>{
        const response=await fetch(`${this.baseUrl}/update/${id}`,{
            method: "PUT",
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        })
        const newData=await response.json()
        return newData as IUpdateCategoria
    }
    async createCategoria(data:ICreateCategoria):Promise<ICreateCategoria>{
        const response=await fetch(`${this.baseUrl}/create`,{
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        })
        const newData=await response.json()
        return newData as ICreateCategoria
    }
    async todasCategoriasHijaPorIdPadre(idPadre:number,idSucursal:number):Promise<ICategorias[] | null>{
        const response=await fetch(`${this.baseUrl}/allSubCategoriasPorCategoriaPadre/${idPadre}/${idSucursal}`)
        if(!response.ok){
            return null
        }
        const data=await response.json()
        return data as ICategorias[] 

    }
    async todasCategoriasHijasPorSucursal(idSucursal:number):Promise<ICategorias[] | null>{
        const response=await fetch(`${this.baseUrl}/allSubCategoriasPorSucursal/${idSucursal}`)
        if(!response.ok){
            return null
        }
        const data=await response.json()
        return data as ICategorias[] 
    }
    async todasCategoriasPadresPorSucursal(idSucursal:number):Promise<ICategorias[] | null>{
        const response=await fetch(`${this.baseUrl}/allCategoriasPadrePorSucursal/${idSucursal}`)
        if(!response.ok){
            return null
        }
        const data=await response.json()
        return data as ICategorias[] 
    }
}