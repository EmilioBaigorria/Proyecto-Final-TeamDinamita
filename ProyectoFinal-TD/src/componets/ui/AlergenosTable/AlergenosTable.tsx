import { FC, useState } from "react"
import { IAlergenos } from "../../../types/dtos/alergenos/IAlergenos"
import { Button } from "react-bootstrap"
import styles from "./AlergenosTable.module.css"
import { useAppDispatch } from "../../../hooks/redux"
import { setActiveAlergeno } from "../../../redux/slices/ActiveAlergenoReducer"
import Swal from 'sweetalert2'
import { AlergenoService } from "../../../services/AlergenosService"
import { PopUpCheckAlergeno } from "../../pages/PopUpCheckAlergeno/PopUpCheckAlergeno"
const API_URL = import.meta.env.VITE_API_URL;

interface IAlergenosTable{
    alergeno:IAlergenos
    setIsCreate:Function
    setDisplayCreateUpdateAlergeno:Function
    refreshAlergeno: Function
}


export const AlergenosTable: FC<IAlergenosTable> = ({alergeno,setIsCreate,setDisplayCreateUpdateAlergeno,refreshAlergeno}) => {
    const dispach=useAppDispatch()
    const alerService=new AlergenoService(API_URL)

    const [displayChekAlergeno,setDisplayChekAlergeno]=useState(false)
    const handleOpenUpdateModal=()=>{
        dispach(setActiveAlergeno({element:alergeno}))
        setIsCreate(false)
        setDisplayCreateUpdateAlergeno(true)
    }
    refreshAlergeno(false)
    
    const handleOpenCheckAlergenoModal=()=>{
        setDisplayChekAlergeno(true)
    }
    const handleDelete=()=>{
        Swal.fire({
            title: '¿Eliminar Alergeno?',
            text: 'No podras recuperarlo',
            icon: 'warning',
            showCancelButton:true,
            cancelButtonText:"Cancelar",
            confirmButtonText: 'Eliminar Alergeno'
        }).then((result)=>{
            if(result.isConfirmed){
                Swal.fire({
                    title: "¡Eliminado!",
                    text: "El alergeno fue eliminado.",
                    icon: "success"
                })
                const deleteAlergeno=async()=>{
                    await alerService.deleteAlergeno(alergeno.id)
                    refreshAlergeno(true)
                }
                deleteAlergeno()
            }
        })
    }
return (
    <>
        <PopUpCheckAlergeno alergeno={alergeno} setDisplayChekAlergeno={setDisplayChekAlergeno} displayChekAlergeno={displayChekAlergeno}/>
        <div className={styles.main_container}>
            <div className={styles.main_upper_container}>
                <h3 style={{fontSize:"1.6rem"}}>{alergeno.denominacion}</h3>
                <div className={styles.buttons_container}>
                    <Button variant="light" onClick={handleOpenCheckAlergenoModal}>
                        <span className="material-symbols-outlined">
                            visibility
                        </span>
                    </Button>
                    <Button variant="light" onClick={handleOpenUpdateModal}>
                    <span className="material-symbols-outlined">
                        edit
                    </span>
                    </Button>
                    <Button variant="light" onClick={handleDelete}>
                        <span className="material-symbols-outlined">
                            delete_forever
                        </span>
                    </Button>
                </div>
                
            </div>
            <div className={styles.main_dropdown_container}>
                    
            </div>
        </div>
    </>
)
}
