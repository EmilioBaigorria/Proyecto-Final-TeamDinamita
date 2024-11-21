import { ChangeEvent, FC, useState } from "react";
import { Button, FloatingLabel, Form, Modal } from "react-bootstrap";
import { CategoriaService } from "../../../services/CategoriaService";
import { ICreateCategoria } from "../../../types/dtos/categorias/ICreateCategoria";
const API_URL = import.meta.env.VITE_API_URL;

interface ICreateCategoryModalProps {
    display: boolean;              // Propiedad para manejar la visibilidad del popup
    setDisplay: Function;          // Funcion para cambiar la visibilidad del popup
    refreshCategory: Function;     // Nadie vio esto jajaja
}

export const PopUpCreateCategory: FC<ICreateCategoryModalProps> = ({ display, setDisplay, refreshCategory }) => {
    const categoriaService = new CategoriaService(API_URL)

    const initialValues: ICreateCategoria = {
        denominacion: "",
        idEmpresa: 1,
        idCategoriaPadre: 0 || null,
    }

    const [createCategory, setCreateCategory] = useState<ICreateCategoria>(initialValues)

    const handleCloseModal = () => {
        setDisplay(false)
    }

    const handleSaveChanges = async () => {
        const response = await categoriaService.createCategoria(createCategory)
        console.log(response);
        refreshCategory();
        handleCloseModal()
        setCreateCategory(initialValues)
    }

    const handleChangeInputs = (event: ChangeEvent<HTMLInputElement>) => {
        const { value, name } = event.target
        setCreateCategory((prev) => ({ ...prev, [`${name}`]: value }))
    }

    return (
        <>
            <Modal show={display} onHide={handleCloseModal}>

                <Modal.Header>
                    <Modal.Title>Crear categoria</Modal.Title>
                </Modal.Header>

                <Modal.Body>

                    <FloatingLabel label="Denominación">
                        <Form.Control style={{ width: "20rem", }} value={createCategory.denominacion} type="text" name='denominacion' onChange={handleChangeInputs} required />
                    </FloatingLabel>

                    <FloatingLabel label="ID Empresa">
                        <Form.Control style={{ width: "20rem", }} value={createCategory.idEmpresa} type="text" name='idEmpresa' onChange={handleChangeInputs} required />
                    </FloatingLabel>

                    <FloatingLabel label="ID Categoría Padre (opcional)">
                        <Form.Control style={{ width: "20rem", }} value={createCategory.idCategoriaPadre ? createCategory.idCategoriaPadre : ""} type="text" name='idCategoriaPadre' onChange={handleChangeInputs} />
                    </FloatingLabel>

                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>
                        Cancelar
                    </Button>
                    <Button variant="primary" onClick={handleSaveChanges}>
                        Guardar cambios
                    </Button>
                </Modal.Footer>

            </Modal>
        </>
    )
}
