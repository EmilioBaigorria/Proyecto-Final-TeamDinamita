import React, { FC, useEffect, useState } from 'react'
import { Button, FloatingLabel, Form, Modal } from 'react-bootstrap'
import { useAppSelector } from '../../../hooks/redux'
import { ISucursal } from '../../../types/dtos/sucursal/ISucursal'
import { UploadImage } from '../../UploadImage'

interface IPopUpEditOffice{
    displayPopUpEditOffice :boolean,
    setDisplayPopUpEditOffice: Function
}
export const PopUpEditOffice: FC<IPopUpEditOffice> = ({displayPopUpEditOffice,setDisplayPopUpEditOffice}) => {
    const [name,setName]=useState("")
    const [openingHour,setOpeningHour]=useState("")
    const [closingHour,setClosingHour]=useState("")
    const[logo,setLogo]=useState<string | null>(null)
    
    
    const activeOffice : ISucursal | null = useAppSelector(
        (state)=>state.ActiveOfficeReducer.activeOffice
    )
    useEffect(()=>{
        if (activeOffice){
            
        }
    })
    const handleClose = () => setDisplayPopUpEditOffice(false);
    const handleShow = () => setDisplayPopUpEditOffice(true);

return (
    <>
    <Modal show={displayPopUpEditOffice} onHide={handleClose}>
        <Modal.Header closeButton >
            <Modal.Title>Editar Sucursal</Modal.Title>
        </Modal.Header>
        {/*Datos de entrada*/}
        <Modal.Body>
        <div>
            <div>
                <FloatingLabel
                    label="Ingrese nombre">
                    <Form.Control style={{
                            width:"20rem",  
                    }} value={activeOffice?.nombre} type="text" placeholder="JonhDoe" onChange={(e)=>{
                        setName(e.target.value)
                    }} />
                </FloatingLabel>
                <FloatingLabel
                    label="Hora de Apertura">
                    <Form.Control style={{
                            width:"20rem",  
                    }} value={activeOffice?.horarioApertura}  type="text" placeholder="JonhDoe" onChange={(e)=>{
                        setOpeningHour(e.target.value)
                    }} />
                </FloatingLabel>
                <FloatingLabel
                    label="Hora de Cierre">
                    <Form.Control style={{
                            width:"20rem",  
                    }} value={activeOffice?.horarioCierre}  type="text" placeholder="JonhDoe" onChange={(e)=>{
                        setClosingHour(e.target.value)
                    }} />
                    <UploadImage image={logo} setImage={setLogo} />
                </FloatingLabel>

            </div>
            <div>

            </div>
            <div>

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
