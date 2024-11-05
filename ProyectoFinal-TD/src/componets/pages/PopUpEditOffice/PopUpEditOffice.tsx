import React, { FC, useEffect, useState } from 'react'
import { Button, FloatingLabel, Form, Modal } from 'react-bootstrap'
import { useAppSelector } from '../../../hooks/redux'
import { ISucursal } from '../../../types/dtos/sucursal/ISucursal'
import { UploadImage } from '../../UploadImage'
import styles from "./PopUpEditOffice.module.css"

interface IPopUpEditOffice{
    displayPopUpEditOffice :boolean,
    setDisplayPopUpEditOffice: Function
}
export const PopUpEditOffice: FC<IPopUpEditOffice> = ({displayPopUpEditOffice,setDisplayPopUpEditOffice}) => {
    const [name,setName]=useState("")
    const [openingHour,setOpeningHour]=useState("")
    const [closingHour,setClosingHour]=useState("")
    const[logo,setLogo]=useState<string | null | undefined>(null)
    const [country,setCountry]=useState<string | undefined>("")
    const [province,setProvince]=useState("")
    const[locality,setLocality]=useState("")
    const[latitude,setLatitude]=useState(0)
    const[longitude,setLongitude]=useState(0)
    const[streetName,setStreetName]=useState("")
    const[streetNumber,setStreetNumber]=useState(0)
    const[postalCode,setPostalCode]=useState(0)
    const[floorNumber,setFloorNumber]=useState(0)
    const[deparmentNumber,setDeparmentNumber]=useState(0)
    const activeOffice : ISucursal | null = useAppSelector(
        (state)=>state.ActiveOfficeReducer.activeOffice
    )
    
    useEffect(()=>{
        if (activeOffice){
            setName(activeOffice.nombre)
            setOpeningHour(activeOffice.horarioApertura)
            setClosingHour(activeOffice.horarioCierre)
            setLogo(activeOffice.logo)
            setCountry(activeOffice.empresa.pais?.nombre)
            setProvince(activeOffice.domicilio.localidad.provincia.nombre)
            setLocality(activeOffice.domicilio.localidad.nombre)
            setLatitude(activeOffice.latitud)
            setLongitude(activeOffice.longitud)
            setStreetName(activeOffice.domicilio.calle)
            setStreetNumber(activeOffice.domicilio.numero)
            setPostalCode(activeOffice.domicilio.cp)
            setFloorNumber(activeOffice.domicilio.piso)
            setDeparmentNumber(activeOffice.domicilio.nroDpto)
        }
    }, [activeOffice])
    const handleClose = () => setDisplayPopUpEditOffice(false);
    const handleShow = () => setDisplayPopUpEditOffice(true);

return (
    <>
    {/*Por el momento lo puse en fullscreen porque me staba sacando de quicio  */}
    <Modal show={displayPopUpEditOffice} onHide={handleClose} fullscreen={true}>
        <Modal.Header closeButton >
            <Modal.Title>Editar Sucursal</Modal.Title>
        </Modal.Header> 
        {/*Datos de entrada*/}
        <Modal.Body>
        <div className={styles.main_container_inputs}>
            {/*primer set de inputs*/}
            <div>
                <FloatingLabel
                    label="Ingrese nombre">
                    <Form.Control style={{
                            width:"20rem",  
                    }} value={name} type="text" placeholder="JonhDoe" onChange={(e)=>{
                        setName(e.target.value)
                    }} />
                </FloatingLabel>
                <FloatingLabel
                    label="Hora de Apertura">
                    <Form.Control style={{
                            width:"20rem",  
                    }} value={openingHour}  type="text" placeholder="JonhDoe" onChange={(e)=>{
                        setOpeningHour(e.target.value)
                    }} />
                </FloatingLabel>
                <FloatingLabel
                    label="Hora de Cierre">
                    <Form.Control style={{
                            width:"20rem",  
                    }} value={closingHour}  type="text" placeholder="JonhDoe" onChange={(e)=>{
                        setClosingHour(e.target.value)
                    }} />
                </FloatingLabel>
                <div>
                    <UploadImage image={logo} setImage={setLogo} />
                </div>
            </div>
            {/*Segundo set de inputs */}
            <div>
                <FloatingLabel
                    label="Pais">
                    <Form.Control style={{
                            width:"20rem",  
                    }} value={country}  type="text" placeholder="Argentina" onChange={(e)=>{
                        setCountry(e.target.value)
                    }} />
                </FloatingLabel>
                <FloatingLabel
                    label="Provincia">
                    <Form.Control style={{
                            width:"20rem",  
                    }} value={province}  type="text" placeholder="Mendoza" onChange={(e)=>{
                        setProvince(e.target.value)
                    }} />
                </FloatingLabel>
                <FloatingLabel
                    label="Localidad">
                    <Form.Control style={{
                            width:"20rem",  
                    }} value={locality}  type="text" placeholder="Mendoza" onChange={(e)=>{
                        setLocality(e.target.value)
                    }} />
                </FloatingLabel>
                <FloatingLabel
                    label="Latitud">
                    <Form.Control style={{
                            width:"20rem",  
                    }} value={latitude}  type="text" placeholder="1242" onChange={(e)=>{
                        setLatitude(Number(e.target.value))
                    }} />
                </FloatingLabel>
                <FloatingLabel
                    label="Longitud">
                    <Form.Control style={{
                            width:"20rem",  
                    }} value={longitude}  type="text" placeholder="9876" onChange={(e)=>{
                        setLongitude(Number(e.target.value))
                    }} />
                </FloatingLabel>
            </div>
            {/*Tercer set de inputs */}
            <div>
            <FloatingLabel
                    label="Nombre Calle">
                    <Form.Control style={{
                            width:"20rem",  
                    }} value={streetName}  type="text" placeholder="EmilioCivit" onChange={(e)=>{
                        setStreetName(e.target.value)
                    }} />
                </FloatingLabel>
                <FloatingLabel
                    label="Numero de Calle">
                    <Form.Control style={{
                            width:"20rem",  
                    }} value={streetNumber}  type="text" placeholder="1212" onChange={(e)=>{
                        setStreetNumber(Number(e.target.value))
                    }} />
                </FloatingLabel>
                <FloatingLabel
                    label="Codigo postal">
                    <Form.Control style={{
                            width:"20rem",  
                    }} value={postalCode}  type="text" placeholder="4450" onChange={(e)=>{
                        setPostalCode(Number(e.target.value))
                    }} />
                </FloatingLabel>
                <FloatingLabel
                    label="Piso">
                    <Form.Control style={{
                            width:"20rem",  
                    }} value={floorNumber}  type="text" placeholder="3" onChange={(e)=>{
                        setFloorNumber(Number(e.target.value))
                    }} />
                </FloatingLabel>
                <FloatingLabel
                    label="Departamento">
                    <Form.Control style={{
                            width:"20rem",  
                    }} value={deparmentNumber}  type="text" placeholder="14" onChange={(e)=>{
                        setDeparmentNumber(Number(e.target.value))
                    }} />
                </FloatingLabel>
            </div>
        </div>
        </Modal.Body>
        <Modal.Footer>
            <Button variant="danger" onClick={handleClose}>
                Cerrar
            </Button>
            <Button variant="success" onClick={handleClose}>
                Guardar Cambios
            </Button>
        </Modal.Footer>
    </Modal>
    </>
)
}
