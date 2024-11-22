import { FC } from 'react'
import { IAlergenos } from '../../../types/dtos/alergenos/IAlergenos'
import { Button, Image, Modal } from 'react-bootstrap'
interface IPopUpCheckAlergeno{
    alergeno:IAlergenos
    setDisplayChekAlergeno:Function
    displayChekAlergeno:boolean
}
export const PopUpCheckAlergeno:FC<IPopUpCheckAlergeno> = ({alergeno,setDisplayChekAlergeno,displayChekAlergeno}) => {



    const handleClose = () => setDisplayChekAlergeno(false);
    

return (
    <>
        <Modal show={displayChekAlergeno} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Ver Alergeno</Modal.Title>
            </Modal.Header>
            
            <Modal.Body style={{display:"flex", flexDirection:"column",alignItems:"center", gap:"3rem"}}>
                Denominacion: {alergeno.denominacion}
                <Image style={{width:"60%"}} src={alergeno.imagen ? 
                alergeno.imagen.url:
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSMeVgKGC9MMGYtkEoy3zKDpVHa2BPZYWmOfg&s"}/>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="success" onClick={handleClose}>
                    Cerrar
                </Button>
            </Modal.Footer>
        </Modal>
    </>
)
}
