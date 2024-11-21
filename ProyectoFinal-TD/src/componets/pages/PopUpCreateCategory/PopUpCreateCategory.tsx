import { ChangeEvent, FC, useState } from "react";
import { Button, FloatingLabel, Form, Modal } from "react-bootstrap";
import { CategoriaService } from "../../../services/CategoriaService";
import { ICategorias } from "../../../types/dtos/categorias/ICategorias";
import { ICreateCategoria } from "../../../types/dtos/categorias/ICreateCategoria";
const API_URL = import.meta.env.VITE_API_URL;

interface IUpdateCategoryModalProps {
    display: boolean;              // Propiedad para manejar la visibilidad del popup
    setDisplay: Function;          // Funcion para cambiar la visibilidad del popup
    category: ICategorias;         // Datos de la categoria a editar
    refreshCategory: Function;     // Nadie vio esto jajaja
}

export const PopUpUpdateCategory: FC<IUpdateCategoryModalProps> = ({ display, setDisplay, category, refreshCategory }) => {
    const categoriaService = new CategoriaService(API_URL)

    const sucursales: number[] = []
    category.sucursales.map((sucur) => (
        sucursales.push(sucur.id)
    ))

    const initialValues: ICreateCategoria = {
        denominacion: "",
        idEmpresa: 0,
        idCategoriaPadre: 0 || null,
    }

    const [createCategory, setCreateCategory] = useState<ICreateCategoria>(initialValues)

    const handleCloseModal = () => {
        setDisplay(false)
    }

    const handleSaveChanges = async () => {
        await categoriaService.createCategoria(createCategory)
        refreshCategory();
        handleCloseModal()
    }

    const handleChangeInputs = (event: ChangeEvent<HTMLInputElement>) => {
        const { value, name } = event.target
        setCreateCategory((prev) => ({ ...prev, [`${name}`]: value }))
    }

    return (
        <>
            <Modal show={display} onHide={handleCloseModal}>

                <Modal.Header>
                    <Modal.Title>Modificar categoria</Modal.Title>
                </Modal.Header>

                <Modal.Body>

                    <FloatingLabel label="Denominación">
                        <Form.Control style={{ width: "20rem", }} value={"Denominación"} type="text" name='denominacion' onChange={handleChangeInputs} required />
                    </FloatingLabel>

                    <FloatingLabel label="ID Empresa">
                        <Form.Control style={{ width: "20rem", }} value={`ID Empresa`} type="text" name='idEmpresa' onChange={handleChangeInputs} required />
                    </FloatingLabel>

                    <FloatingLabel label="ID Categoría Padre (opcional)">
                        <Form.Control style={{ width: "20rem", }} value={`ID Categoría Padre`} type="text" name='idCategoriaPadre' onChange={handleChangeInputs} />
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
