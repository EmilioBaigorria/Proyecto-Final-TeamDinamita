
import { FC } from "react"
import styles from "./PopUpChekEnterprise.module.css"
import { useAppDispatch, useAppSelector } from "../../../hooks/redux"
import { Button, Modal } from "react-bootstrap"
import { IEmpresa } from "../../../types/dtos/empresa/IEmpresa"
interface IDisplayPopUp {
    displayModalCheckEnterprise: boolean
    setdisplayModalCheckEnterprise: Function

}
export const PopUpChekEnterprise: FC<IDisplayPopUp> = ({ displayModalCheckEnterprise, setdisplayModalCheckEnterprise }) => {
    const dispach = useAppDispatch()


    const elementActive: IEmpresa = useAppSelector(
        (state) => state.ActiveEntrepriseReducer.activeEnterprise
    )
    const handleCloseModal = () => {
        setdisplayModalCheckEnterprise(false)
        
    }
    return (
        <Modal
            show={displayModalCheckEnterprise}
            onHide={handleCloseModal}
            dialogClassName={styles.modal_empresa}
        >
            <Modal.Header closeButton>
                <Modal.Title>{elementActive?.nombre}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h1 className={styles.text_font_format}>Nombre: {elementActive?.nombre}</h1>
                <h1 className={styles.text_font_format}>Razon social: {elementActive?.razonSocial}</h1>
                <h1 className={styles.text_font_format}>Cuit: {elementActive?.cuit}</h1>
                <h1 className={styles.text_font_format}>Logo:
                    <img src={elementActive?.logo ?? ''} style={{ width: "25%" }} />
                </h1>
                    
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleCloseModal}>
                    Cerrar
                </Button>
            </Modal.Footer>
        </Modal>
    )
}
