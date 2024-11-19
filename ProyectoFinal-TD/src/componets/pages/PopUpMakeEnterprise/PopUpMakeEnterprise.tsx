import { FC, useEffect, useState } from "react"
import { Button, FloatingLabel, Form } from "react-bootstrap"
import { EmpresaService } from "../../../services/EmpresaService";
import { IPais } from "../../../types/IPais";
import { ISucursal } from "../../../types/dtos/sucursal/ISucursal";
import Styles from "./PopUpMakeEnterprise.module.css"
import { UploadImage } from "../../UploadImage";
import { useDispatch, useSelector } from "react-redux";
import { addEmpresa } from "../../../redux/slices/EmpresasSlice";
import { IEmpresa } from "../../../types/dtos/empresa/IEmpresa";
import { RootState } from "../../../redux/store/store";

const API_URL = import.meta.env.VITE_API_URL;

interface IDisplayPopUp{
    display:boolean,
    setDisplay:Function
}
export const PopUpMakeEnterprise: FC<IDisplayPopUp> = ({display,setDisplay}) => {

    const dispatch = useDispatch()
    const enterprises = useSelector((state: RootState) => state.enterprises.enterprises)

    const [name,setName]=useState("")
    const [rS,setrS]=useState("")
    const [cut,setCut]=useState<number>(0)
    const [image, setImage] = useState<string | null>(null);
    async function handleSumit() {
        try {
            const createdEmpresa :IEmpresa = await new EmpresaService(API_URL + "/empresas").post({
                nombre: name,
                razonSocial: rS,
                cuit: cut,
                logo: image,    
            })
            dispatch(addEmpresa(createdEmpresa))
            console.log(enterprises)    
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
                <UploadImage image={image} setImage={setImage} />
            </div>
            {/*Botones inferiores*/}
            <div className={Styles.main_button_container}>
                <Button variant="danger" onClick={()=>{
                    setDisplay(!display)   
                }}>Cancelar</Button>
                <Button variant="success" onClick={()=>{
                    handleSumit()
                    setDisplay(false)
                }}>Aceptar</Button>
            </div>
            
        </div>
    </div>
)

}
