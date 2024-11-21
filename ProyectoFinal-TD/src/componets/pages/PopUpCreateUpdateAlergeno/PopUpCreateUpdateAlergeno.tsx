import { ChangeEvent, FC, useEffect, useState } from 'react'
import { Button, FloatingLabel, Form, Modal } from 'react-bootstrap'
import { ICreateAlergeno } from '../../../types/dtos/alergenos/ICreateAlergeno'
import { IUpdateAlergeno } from '../../../types/dtos/alergenos/IUpdateAlergeno'
import { UploadImage } from '../../UploadImage'

import { useAppDispatch, useAppSelector } from '../../../hooks/redux'
import { AlergenoService } from '../../../services/AlergenosService'
import { removeActiveAlergeno } from '../../../redux/slices/ActiveAlergenoReducer'
const API_URL = import.meta.env.VITE_API_URL;

interface IPopUpCreateUpdateAlergeno {
    displayCreateUpdateAlergeno: boolean
    setDisplayCreateUpdateAlergeno: Function
    isCreate: boolean
}
export const PopUpCreateUpdateAlergeno: FC<IPopUpCreateUpdateAlergeno> = ({ displayCreateUpdateAlergeno, setDisplayCreateUpdateAlergeno, isCreate }) => {
    let initialValues: ICreateAlergeno | IUpdateAlergeno
    const alergeno = useAppSelector(
        (state) => state.ActiveAlergenoReducer.activeAlergeno
    )
    const dispach = useAppDispatch()
    const alergenoService = new AlergenoService(API_URL)
    if (isCreate) {
        initialValues = { denominacion: "", imagen: null } as ICreateAlergeno
    } else {
        initialValues = { id: alergeno?.id, denominacion: alergeno?.denominacion, imagen: alergeno?.imagen } as IUpdateAlergeno
    }
    const [newAlergenosData, setNewAlergenosData] = useState(initialValues)
    const [logo, setLogo] = useState<string | null>(null)
    const handleClose = () => {
        setNewAlergenosData({ denominacion: "", imagen: null })
        dispach(removeActiveAlergeno())
        setDisplayCreateUpdateAlergeno(false)
    }
    const handleUpdate = () => {
        if (alergeno) {
            const updatedAlergeno: IUpdateAlergeno = {
                id: alergeno?.id,
                denominacion: newAlergenosData.denominacion,
                imagen: {
                    name: "generic",
                    url: String(logo)
                }
            }
            const response = alergenoService.updateAlergeno(alergeno?.id, updatedAlergeno)
            console.log(response)
        }
        handleClose()
    }
    const handleCreate = () => {
        const newAlergeno: ICreateAlergeno = {
            denominacion: newAlergenosData.denominacion,
            imagen: {
                name: "newGeneric",
                url: String(logo)
            }
        }
        const response = alergenoService.createAlergeno(newAlergeno)
        console.log(response)
        handleClose()
    }

    const handleChangeInputs = (event: ChangeEvent<HTMLInputElement>) => {
        const { value, name } = event.target
        setNewAlergenosData((prev) => ({ ...prev, [`${name}`]: value }))
    }
    const setInit = useEffect(() => {
        const setInitialValues = async () => {
            setNewAlergenosData(initialValues)
        }
        setInitialValues()
    }, [displayCreateUpdateAlergeno])


    return (
        <>
            <Modal show={displayCreateUpdateAlergeno} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{isCreate ? "Crear Alergeno" : "Editar Alergenos"}</Modal.Title>
                </Modal.Header>
                <Modal.Body style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "1rem" }}>
                    <FloatingLabel
                        label="Denominacion">
                        <Form.Control style={{
                            width: "20rem",
                        }} value={newAlergenosData.denominacion} type="text" name={"denominacion"} onChange={handleChangeInputs} />
                    </FloatingLabel>
                    <UploadImage image={logo} setImage={setLogo} />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={handleClose}>
                        Cancelar
                    </Button>
                    <Button variant="success" onClick={isCreate ? handleCreate : handleUpdate}>
                        {isCreate ? "Crear Sucursal" : "Completar Edicion"}
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}
