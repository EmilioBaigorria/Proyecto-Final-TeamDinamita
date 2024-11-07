import {  ChangeEvent, FC, useEffect, useState } from 'react'
import { Button, FloatingLabel, Form, Modal } from 'react-bootstrap'
import { useAppSelector } from '../../../hooks/redux'
import { ISucursal } from '../../../types/dtos/sucursal/ISucursal'
import { UploadImage } from '../../UploadImage'
import styles from "./PopUpEditOffice.module.css"
import { SucursalService } from '../../../services/SucursalService'
import { IUpdateSucursal } from '../../../types/dtos/sucursal/IUpdateSucursal'
import { ICategorias } from '../../../types/dtos/categorias/ICategorias'
const API_URL = import.meta.env.VITE_API_URL;

interface IPopUpEditOffice{
    displayPopUpEditOffice :boolean,
    setDisplayPopUpEditOffice: Function
}
interface IInitialValues{
    idEmpresa: number ,
        nombre: string,
        id: number,
        eliminado: boolean,
        latitud:number,
        longitud: number,
        calle: string,
        numero: number,
        cp: number,
        piso:number,
        nroDpto:number,
        idLocalidad:number,
        logo:string,
        categorias:ICategorias[],
        esCasaMatriz:Boolean,
        horarioApertura: string,
        horarioCierre: string
}

export const PopUpEditOffice: FC<IPopUpEditOffice> = ({displayPopUpEditOffice,setDisplayPopUpEditOffice}) => {
    const activeOffice : ISucursal | null = useAppSelector(
        (state)=>state.ActiveOfficeReducer.activeOffice
    )
    const initialValues  ={
        idEmpresa: activeOffice?.empresa.id|| 0 ,
        nombre: activeOffice?.nombre || "",
        id: activeOffice?.id|| 0,
        eliminado: activeOffice?.eliminado || false,
        latitud:activeOffice?.latitud|| 0,
        longitud: activeOffice?.longitud || 0,
        calle: activeOffice?.calle|| "",
        numero: activeOffice?.domicilio.numero || 0,
        cp: activeOffice?.domicilio.cp || 0,
        piso:activeOffice?.domicilio.piso || 0,
        nroDpto:activeOffice?.domicilio.nroDpto || 0,
        idLocalidad:activeOffice?.domicilio.localidad.id ||0,
        logo:activeOffice?.logo||"",
        categorias:activeOffice?.categorias|| [],
        esCasaMatriz:activeOffice?.esCasaMatriz || false,
        horarioApertura: activeOffice?.horarioApertura|| "",
        horarioCierre: activeOffice?.horarioCierre|| ""
    }   
    const[updatedSucursal,setUpdatedsucursal]=useState(initialValues)
    const[logo,setLogo]=useState<string | null>(null)
    const sucurSevice= new SucursalService(API_URL+"/sucursales/update")
    useEffect(()=>{
        setUpdatedsucursal(initialValues)
    },[displayPopUpEditOffice])
    const handleClose = () => setDisplayPopUpEditOffice(false);
    const handleSave=async ()=>{
        const upSucur :IUpdateSucursal={
            id: Number(activeOffice?.id),
            nombre:String( updatedSucursal.nombre),
            idEmpresa: Number(updatedSucursal.idEmpresa),
            eliminado: Boolean(updatedSucursal.eliminado),
            latitud: Number(updatedSucursal.latitud),
            longitud: Number(updatedSucursal.longitud),
            domicilio: {
                id: Number(activeOffice?.domicilio.id),
                calle: String(updatedSucursal.calle),
                numero: Number(updatedSucursal.numero),
                cp: Number(updatedSucursal.cp),
                piso: Number(updatedSucursal.piso),
                nroDpto: Number(updatedSucursal.nroDpto),
                idLocalidad: Number(updatedSucursal.idLocalidad)
                },
            logo: String(updatedSucursal.logo),
            categorias: updatedSucursal.categorias,
            esCasaMatriz:  Boolean(updatedSucursal.esCasaMatriz),
            horarioApertura: String(updatedSucursal.horarioApertura),
            horarioCierre: String(updatedSucursal.horarioCierre)
        }
        console.log(updatedSucursal)
        console.log(upSucur)
        try{
            await sucurSevice.put(Number(upSucur.id),upSucur)
        }catch(err){
            console.log("Ocurrio un error gurdando la nueva sucursal: ",err)
        }
    }
    
    const handleShow = () => setDisplayPopUpEditOffice(true);
    

    const handleChangeInputs = (event: ChangeEvent<HTMLInputElement>)=>{
        const {value, name} = event.target
        console.log(value, name)
        console.log(initialValues)
        console.log(updatedSucursal)
        

        setUpdatedsucursal((prev)=>({...prev, [`${name}`]: value}))
        
    }
    

return (
    <>
    
    <Modal show={displayPopUpEditOffice} onHide={handleClose} fullscreen={true}>
        <Modal.Header closeButton >
            <Modal.Title>Editar Sucursal</Modal.Title>
        </Modal.Header> 
        {/*Datos de entrada*/}
        <Modal.Body>
        <div className={styles.main_container_inputs}>
            {/*primer set de inputs*/}
            <div className={styles.inpunts_style}>
                <FloatingLabel
                    label="Ingrese nombre">
                    <Form.Control style={{
                            width:"20rem",  
                    }} value={updatedSucursal.nombre} type="text"  name={"nombre"} onChange={handleChangeInputs} />
                </FloatingLabel>
                <FloatingLabel
                    label="Hora de Apertura">
                    <Form.Control style={{
                            width:"20rem",  
                    }} value={updatedSucursal.horarioApertura}  type="text" name='horarioApertura' onChange={handleChangeInputs} />
                </FloatingLabel>
                <FloatingLabel
                    label="Hora de Cierre">
                    <Form.Control style={{
                            width:"20rem",  
                    }} value={updatedSucursal.horarioCierre}  type="text" name='horarioCierre' onChange={handleChangeInputs} />
                </FloatingLabel>
                <div>
                    <UploadImage image={logo} setImage={setLogo} />
                </div>
            </div>
            {/*Segundo set de inputs */}
            <div className={styles.inpunts_style}>
                <FloatingLabel
                    label="IdLocalidad">
                    <Form.Control style={{
                            width:"20rem",  
                    }} value={updatedSucursal.idLocalidad}  type="text" name='idLocalidad' onChange={handleChangeInputs} />
                </FloatingLabel>
                <FloatingLabel
                    label="Latitud">
                    <Form.Control style={{
                            width:"20rem",  
                    }} value={updatedSucursal.latitud}  type="text" name='latitud' onChange={handleChangeInputs} />
                </FloatingLabel>
                <FloatingLabel
                    label="Longitud">
                    <Form.Control style={{
                            width:"20rem",  
                    }} value={updatedSucursal.longitud}  type="text" name='longitud' onChange={handleChangeInputs} />
                </FloatingLabel>
            </div>
            {/*Tercer set de inputs */}
            <div className={styles.inpunts_style}>
            <FloatingLabel
                    label="Nombre Calle">
                    <Form.Control style={{
                            width:"20rem",  
                    }} value={updatedSucursal.calle}  type="text" name='calle' onChange={handleChangeInputs} />
                </FloatingLabel>
                <FloatingLabel
                    label="Numero de Calle">
                    <Form.Control style={{
                            width:"20rem",  
                    }} value={updatedSucursal.numero}  type="text" name='numero' onChange={handleChangeInputs} />
                </FloatingLabel>
                <FloatingLabel
                    label="Codigo postal">
                    <Form.Control style={{
                            width:"20rem",  
                    }} value={updatedSucursal.cp}  type="text" name='cp' onChange={handleChangeInputs}/>
                </FloatingLabel>
                <FloatingLabel
                    label="Piso">
                    <Form.Control style={{
                            width:"20rem",  
                    }} value={updatedSucursal.piso}  type="text" name='piso' onChange={handleChangeInputs} />
                </FloatingLabel>
                <FloatingLabel
                    label="Departamento">
                    <Form.Control style={{
                            width:"20rem",  
                    }} value={updatedSucursal.nroDpto}  type="text" name='nroDpto' onChange={handleChangeInputs} />
                </FloatingLabel>
            </div>
        </div>
        </Modal.Body>
        <Modal.Footer>
            <Button variant="danger" onClick={handleClose}>
                Cerrar
            </Button>
            <Button variant="success" onClick={()=>{
                handleSave()
            }}>
                Guardar Cambios
            </Button>
        </Modal.Footer>
    </Modal>
    </>
)
}
