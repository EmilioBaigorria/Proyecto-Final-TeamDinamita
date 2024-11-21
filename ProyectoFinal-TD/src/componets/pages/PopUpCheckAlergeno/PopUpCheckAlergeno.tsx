import { FC } from 'react'
import { IAlergenos } from '../../../types/dtos/alergenos/IAlergenos'
import { Button, Modal } from 'react-bootstrap'
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
                <Modal.Title>Modal heading</Modal.Title>
            </Modal.Header>
            <Modal.Body>Woohoo, you are reading this text in a modal!</Modal.Body>
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
