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
}