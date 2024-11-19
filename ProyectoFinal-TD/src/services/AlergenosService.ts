import { IAlergenos } from "../types/dtos/alergenos/IAlergenos";
import { ICreateAlergeno } from "../types/dtos/alergenos/ICreateAlergeno";
import { IUpdateAlergeno } from "../types/dtos/alergenos/IUpdateAlergeno";
import { BackendClient } from "./BackendClient";

export class AlergenoService extends BackendClient<IAlergenos|IUpdateAlergeno|ICreateAlergeno>{
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