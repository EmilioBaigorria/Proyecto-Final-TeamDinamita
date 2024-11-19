import { FC, useEffect, useState } from "react";
import { AlergenoService } from "../../../services/AlergenosService"
import { IAlergenos } from "../../../types/dtos/alergenos/IAlergenos";
import { AlergenosTable } from "../AlergenosTable/AlergenosTable";
import { Button } from "react-bootstrap";
import style from "./AlergenosPage.module.css"

const API_URL = import.meta.env.VITE_API_URL;
interface IAlergenosPage{
    setDisplayCreateUpdateAlergeno:Function
}
export const AlergenosPage:FC<IAlergenosPage> = ({setDisplayCreateUpdateAlergeno}) => {
    const alerService=new AlergenoService(API_URL)
    const [alergenos,setAlergenos]=useState<IAlergenos[]|null>([])
    const getAlergenos=useEffect(()=>{
        const getaler=async ()=>{
            try {
                const alergenosData=await alerService.getAllAlergenos()
                
                setAlergenos(alergenosData)
                await console.log("Alergenos obtenidos:",alergenos)
            } catch (error) {
                console.log("Hubo un error obteniendo los alergenos:",error)
            }
        }
        getaler()
    },[])
    const handleOpenCreateModal=()=>{
        setDisplayCreateUpdateAlergeno(true)
    }
return (
    <div className={style.main_container}>
        <div className={style.button_container}>
            <Button onClick={handleOpenCreateModal} style={{textAlign:"center"}} variant="secondary">
                AGREGAR ALERGENO
                <span className="material-symbols-outlined">
                    add_circle
                </span>
            </Button>
        </div>
        <div className={style.alergenos_container}>
            {alergenos?.map((alg)=>(
            
                <AlergenosTable alergeno={alg} key={alg.id}/>
            
            ))}
        </div>
    </div>
)
}
