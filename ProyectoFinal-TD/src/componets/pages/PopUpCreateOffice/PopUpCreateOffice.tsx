import { ChangeEvent, FC, useState } from 'react'
import { Button, FloatingLabel, Form, Modal } from 'react-bootstrap'

import styles from "./PopUpCreateOffice.module.css"
import { UploadImage } from '../../UploadImage'
import { SucursalService } from '../../../services/SucursalService'
import { ICreateSucursal } from '../../../types/dtos/sucursal/ICreateSucursal'
import { useAppSelector } from '../../../hooks/redux'

import {useDispatch, useSelector} from "react-redux"
import { RootState } from '../../../redux/store/store'
import { addSucursal } from '../../../redux/slices/sucursalSlice'
import { ISucursal } from '../../../types/dtos/sucursal/ISucursal'

const API_URL = import.meta.env.VITE_API_URL;
interface IPopUpCreateOffice{
    displayPopUpCreateOffice:boolean
    setDisplayPopUpCreateOffice:Function
}
export const PopUpCreateOffice:FC<IPopUpCreateOffice> = ({displayPopUpCreateOffice,setDisplayPopUpCreateOffice}) => {
    const activeEnterprise=useAppSelector(
        (state)=>state.ActiveEntrepriseReducer.activeEnterprise
    )
    const initialValues={
        nombre:"",
        horarioApertura: "",
        horarioCierre: "",
        esCasaMatriz: false,
        latitud: 0,
        longitud: 0,
        calle: "",
        numero: 0,
        cp: 0,
        piso: 0,
        nroDpto: 0,
        idLocalidad: 0,
        idEmpresa: 0,
        logo: ""
    }
    const sucuService=new SucursalService(API_URL)
    const [newScursal,setNewScursal]=useState(initialValues)
    const[logo,setLogo]=useState<null | string>(null)

    //Estado Global
    const dispatch = useDispatch()
    const sucursales = useSelector((state: RootState) => state.sucursales.sucursales)


    const handleChangeInputs = (event: ChangeEvent<HTMLInputElement>)=>{
        const {value, name} = event.target
        setNewScursal((prev)=>({...prev, [`${name}`]: value}))
        
    }
    const handleClose=()=>{
        setDisplayPopUpCreateOffice(false)
    }
    const handleSave= async ()=>{
        const newSucu :ICreateSucursal={
            nombre: newScursal.nombre,
            horarioApertura: newScursal.horarioApertura,
            horarioCierre: newScursal.horarioCierre,
            esCasaMatriz: newScursal.esCasaMatriz,
            latitud: newScursal.latitud,
            longitud: newScursal.longitud,
            domicilio: {
                calle: newScursal.calle,
                numero: newScursal.numero,
                cp: newScursal.cp,
                piso: newScursal.piso,
                nroDpto: newScursal.nroDpto,
                idLocalidad: newScursal.idLocalidad
            },
            idEmpresa: Number(activeEnterprise?.id),
            logo: logo

        }
        try {
            const createdSucursal:ISucursal= await sucuService.createSucursal(newSucu) as ISucursal 
            dispatch(addSucursal(createdSucursal))
            setDisplayPopUpCreateOffice(false)
        } catch (error) {
            console.log("Hubor un error creando la nueva sucursal: ",error)
        }
        
    }
    
return (
    <>
    <Modal show={displayPopUpCreateOffice} onHide={handleClose} fullscreen={true}>
        <Modal.Header closeButton={true} >
            <Modal.Title>Crear Sucursal</Modal.Title>
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
                    }} value={newScursal.nombre} type="text" placeholder="JonhDoe" name={"nombre"} onChange={handleChangeInputs} />
                </FloatingLabel>
                <FloatingLabel
                    label="Hora de Apertura">
                    <Form.Control style={{
                            width:"20rem",  
                    }} value={newScursal.horarioApertura}  type="text" name='horarioApertura' onChange={handleChangeInputs} />
                </FloatingLabel>
                <FloatingLabel
                    label="Hora de Cierre">
                    <Form.Control style={{
                            width:"20rem",  
                    }} value={newScursal.horarioCierre}  type="text" name='horarioCierre' onChange={handleChangeInputs} />
                </FloatingLabel>
                <div>
                    <UploadImage image={newScursal.logo} setImage={setLogo} />
                </div>
            </div>
            {/*Segundo set de inputs */}
            <div className={styles.inpunts_style}>
                <FloatingLabel
                    label="IdLocalidad">
                    <Form.Control style={{
                            width:"20rem",  
                    }} value={newScursal.idLocalidad}  type="text" name='idLocalidad' onChange={handleChangeInputs} />
                </FloatingLabel>
                <FloatingLabel
                    label="Latitud">
                    <Form.Control style={{
                            width:"20rem",  
                    }} value={newScursal.latitud}  type="text" name='latitud' onChange={handleChangeInputs} />
                </FloatingLabel>
                <FloatingLabel
                    label="Longitud">
                    <Form.Control style={{
                            width:"20rem",  
                    }} value={newScursal.longitud}  type="text" name='longitud' onChange={handleChangeInputs} />
                </FloatingLabel>
            </div>
            {/*Tercer set de inputs */}
            <div className={styles.inpunts_style}>
            <FloatingLabel
                    label="Nombre Calle">
                    <Form.Control style={{
                            width:"20rem",  
                    }} value={newScursal.calle}  type="text" name='calle' onChange={handleChangeInputs} />
                </FloatingLabel>
                <FloatingLabel
                    label="Numero de Calle">
                    <Form.Control style={{
                            width:"20rem",  
                    }} value={newScursal.numero}  type="text" name='numero' onChange={handleChangeInputs} />
                </FloatingLabel>
                <FloatingLabel
                    label="Codigo postal">
                    <Form.Control style={{
                            width:"20rem",  
                    }} value={newScursal.cp}  type="text" name='cp' onChange={handleChangeInputs} />
                </FloatingLabel>
                <FloatingLabel
                    label="Piso">
                    <Form.Control style={{
                            width:"20rem",  
                    }} value={newScursal.piso}  type="text" name='piso' onChange={handleChangeInputs} />
                </FloatingLabel>
                <FloatingLabel
                    label="Departamento">
                    <Form.Control style={{
                            width:"20rem",  
                    }} value={newScursal.nroDpto}  type="text" name='nroDpto' onChange={handleChangeInputs} />
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
                Crear Sucursal
            </Button>
        </Modal.Footer>
    </Modal>
    </>
)
}
