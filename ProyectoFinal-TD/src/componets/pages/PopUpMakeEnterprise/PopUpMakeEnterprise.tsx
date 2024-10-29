import { FC, useEffect, useState } from "react"
import { Button, FloatingLabel, Form } from "react-bootstrap"
import { EmpresaService } from "../../../services/EmpresaService";
import { IPais } from "../../../types/IPais";
import { ISucursal } from "../../../types/dtos/sucursal/ISucursal";
import Styles from "./PopUpMakeEnterprise.module.css"

const API_URL = import.meta.env.VITE_API_URL;

interface IDisplayPopUp{
    display:boolean,
    setDisplay:Function
}
export const PopUpMakeEnterprise: FC<IDisplayPopUp> = ({display,setDisplay}) => {
    const [name,setName]=useState("")
    const [rS,setrS]=useState("")
    const [cut,setCut]=useState<number>(0)
    async function handleSumit() {
        try {
            const createEmpresa = await new EmpresaService(API_URL + "/empresas").post({
                id: 1,
                nombre: name,
                razonSocial: rS,
                cuit: cut,
                logo: "https://mtek3d.com/wp-content/uploads/2018/01/image-placeholder-500x500.jpg",
                
            });
        } catch (err) {
            console.error("Error al cargar las empresas:", err);
        }
    } 
    
return (
    <div className={Styles.main_background_container} style={{display:display ? "flex" : "none",}}>
        <div className={Styles.main_content_container}>
            <h2>Crear empresa</h2>
            {/*Inputs*/}
            <FloatingLabel
                label="Ingrese nombre">
                <Form.Control style={{
                        width:"20rem",  
                }} type="text" placeholder="JonhDoe" onChange={(e)=>{
                    setName(e.target.value)
                }} />
            </FloatingLabel>
            <FloatingLabel
                label="Razon social">
                <Form.Control style={{
                        width:"20rem",  
                }} type="text" placeholder="22331155" onChange={(e)=>{
                    setrS(e.target.value)
                }} />
            </FloatingLabel>
            <FloatingLabel
                label="Cuit">
                <Form.Control style={{
                        width:"20rem",  
                }} type="text" placeholder="462984313" onChange={(e)=>{
                    setCut(Number(e.target.value))
                }} />
            </FloatingLabel>
            {/*Imagen*/}
            <div className={Styles.main_image_container}>
                <Button  variant="warning">Agregar Imagen</Button>
                {/*Un placeholder hasta que se añada la funcion de subir imagenes*/}
                <img src="https://mtek3d.com/wp-content/uploads/2018/01/image-placeholder-500x500.jpg" style={{
                    width:"128px"
                }}/>
            </div>
            {/*Botones inferiores*/}
            <div className={Styles.main_button_container}>
                <Button variant="danger" onClick={()=>{
                    setDisplay(!display)   
                }}>Cancelar</Button>
                <Button variant="success" onClick={()=>{
                    handleSumit()
                }}>Aceptar</Button>
            </div>
            
        </div>
    </div>
)

}
