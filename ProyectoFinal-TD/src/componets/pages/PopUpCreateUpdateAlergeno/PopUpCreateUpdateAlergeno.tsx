import  { ChangeEvent, FC, useEffect, useState } from 'react'
import { Button, FloatingLabel, Form, Modal } from 'react-bootstrap'
import { ICreateAlergeno } from '../../../types/dtos/alergenos/ICreateAlergeno'
import { IUpdateAlergeno } from '../../../types/dtos/alergenos/IUpdateAlergeno'
import { UploadImage } from '../../UploadImage'
import { IAlergenos } from '../../../types/dtos/alergenos/IAlergenos'


interface IPopUpCreateUpdateAlergeno{
    displayCreateUpdateAlergeno:boolean
    setDisplayCreateUpdateAlergeno:Function
    alergeno?:IAlergenos
    isCreate:boolean
}
export const PopUpCreateUpdateAlergeno:FC<IPopUpCreateUpdateAlergeno> = ({displayCreateUpdateAlergeno,setDisplayCreateUpdateAlergeno,isCreate,alergeno}) => {
    let initialValues:ICreateAlergeno|IUpdateAlergeno
    if(isCreate){
        initialValues={denominacion:"",imagen:null} as ICreateAlergeno
        console.log("Iniciado como crear",initialValues)
    }else{
        initialValues={id:alergeno?.id,denominacion:alergeno?.denominacion,imagen:alergeno?.imagen} as IUpdateAlergeno
        console.log("Iniciado como update",initialValues)
    }
    
    const [newAlergenosData,setNewAlergenosData]=useState(initialValues)
    const [logo,setLogo]=useState<string | null>(null)
    const handleClose = () => setDisplayCreateUpdateAlergeno(false);


    const handleChangeInputs = (event: ChangeEvent<HTMLInputElement>)=>{
        const {value, name} = event.target
        setNewAlergenosData((prev)=>({...prev, [`${name}`]: value}))
    }
    
    
return (
    <>
    <Modal show={displayCreateUpdateAlergeno} onHide={handleClose}>
        <Modal.Header closeButton>
        <Modal.Title>{isCreate?"Crear Alergeno":"Editar Alergenos"}</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{display:"flex", flexDirection:"column",alignItems:"center",gap:"1rem"}}>
            <FloatingLabel
                label="Denominacion">
                <Form.Control style={{
                        width:"20rem",  
                }} value={newAlergenosData.denominacion} type="text"  name={"nombre"} onChange={handleChangeInputs} />
            </FloatingLabel>
            <UploadImage image={logo} setImage={setLogo}/>
        </Modal.Body>
        <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
            Close
        </Button>
        <Button variant="primary" onClick={handleClose}>
            Save Changes
        </Button>
        </Modal.Footer>
    </Modal>
    </>
)
}
