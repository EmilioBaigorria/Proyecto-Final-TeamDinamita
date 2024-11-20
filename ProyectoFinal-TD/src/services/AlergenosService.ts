import { IAlergenos } from "../types/dtos/alergenos/IAlergenos";
import { ICreateAlergeno } from "../types/dtos/alergenos/ICreateAlergeno";
import { IUpdateAlergeno } from "../types/dtos/alergenos/IUpdateAlergeno";
import { BackendClient } from "./BackendClient";

export class AlergenoService extends BackendClient<IAlergenos|IUpdateAlergeno|ICreateAlergeno>{
    async createAlergeno(data:ICreateAlergeno):Promise<ICreateAlergeno>{
        const response=await fetch(`${this.baseUrl}/alergenos`,{
            method:"POST",
            headers: {
                "Content-Type": "application/json",
            },
            body:JSON.stringify(data)
        })
        const newData=await response.json()
        return newData as ICreateAlergeno
    }
    async updateAlergeno(id:number ,data:IUpdateAlergeno):Promise<IUpdateAlergeno>{
        const response=await fetch(`${this.baseUrl}/alergenos/${id}`,{
            method:"PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body:JSON.stringify(data)
        })
        const newData=await response.json()
        return newData as IUpdateAlergeno
    }
    async deleteAlergeno(id:number):Promise<void>{
        const response=await fetch(`${this.baseUrl}/alergenos/${id}`,{
            method:"DELETE",
        })
        if(!response.ok){
            throw new Error(`Error al eliminar el alergeno con ID ${id}`)
        }
    }
    async getAlergenoById(id:number):Promise<IAlergenos[]|null>{
        const response=await fetch(`${this.baseUrl}/alergenos/${id}`)
        if(!response.ok){
            return null
        }
        const data=await response.json()
        return data as IAlergenos[]
    }
    async getAllAlergenos():Promise<IAlergenos[]|null>{
        const response=await fetch(`${this.baseUrl}/alergenos`)
        if(!response.ok){
            return null
        }
        const data=await response.json()
        return data as IAlergenos[]
    }
}