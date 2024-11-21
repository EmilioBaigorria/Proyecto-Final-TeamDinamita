import { ChangeEvent, FC, useEffect, useState } from "react";
import { IUpdateCategoria } from "../../../types/dtos/categorias/IUpdateCategoria";
import { ICategorias } from "../../../types/dtos/categorias/ICategorias";
import { useAppSelector } from "../../../hooks/redux";
import { Button, FloatingLabel, Form, Modal } from "react-bootstrap";
import { CategoriaService } from "../../../services/CategoriaService";
const API_URL = import.meta.env.VITE_API_URL;

interface IUpdateCategoryModalProps {
    display: boolean;              // Propiedad para manejar la visibilidad del popup
    setDisplay: Function;          // Funcion para cambiar la visibilidad del popup
    category: ICategorias;         // Datos de la categoria a editar
    refreshCategory: Function;
}

export const PopUpUpdateCategory: FC<IUpdateCategoryModalProps> = ({ display, setDisplay, category, refreshCategory }) => {
    const categoriaService = new CategoriaService(API_URL)

    const sucursales: number[] = []
    category.sucursales.map((sucur) => (
        sucursales.push(sucur.id)
    ))

    const activeEnterpriseId = useAppSelector(
        (state) => state.ActiveEntrepriseReducer.activeEnterprise?.id
    );

    const initialValues: IUpdateCategoria = {
        id: category.id,
        denominacion: category.denominacion,
        eliminado: category.eliminado,
        idSucursales: sucursales,
        idEmpresa: Number(activeEnterpriseId),
        idCategoriaPadre: category.categoriaPadre ? category.categoriaPadre?.id : null,
    }

    const [updateCategory, setUpdateCategory] = useState(initialValues)

    useEffect(() => {
        const setInitialValues = async () => {
            setUpdateCategory(initialValues)
        }
        setInitialValues()
    }, [display])

    const handleCloseModal = () => {
        setDisplay(false)
    }

    const handleSaveChanges = async () => {
        await categoriaService.updateCategoria(initialValues.id, updateCategory)
        refreshCategory();
        handleCloseModal()
    }

    const handleChangeInputs = (event: ChangeEvent<HTMLInputElement>) => {
        const { value, name } = event.target
        console.log(value, name);
        setUpdateCategory((prev) => ({ ...prev, [`${name}`]: value }))
    }

    return (
        <>
            <Modal show={display} onHide={handleCloseModal}>

                <Modal.Header>
                    <Modal.Title>Modificar categoria</Modal.Title>
                </Modal.Header>

                <Modal.Body>

                    <FloatingLabel label="Denominación">
                        <Form.Control style={{ width: "20rem", }} value={`${updateCategory.denominacion}`} type="text" name='denominacion' onChange={handleChangeInputs} required />
                    </FloatingLabel>

                    <Form.Check style={{ width: "20rem", }} value={`${updateCategory.eliminado}`} label={updateCategory.eliminado ? "Eliminado" : "Sin eliminar"} type="switch" name='eliminado' onCh={handleChangeInputs} required />

                    <FloatingLabel label="ID Empresa">
                        <Form.Control style={{ width: "20rem", }} value={`${updateCategory.idEmpresa}`} type="text" name='idEmpresa' onChange={handleChangeInputs} required />
                    </FloatingLabel>

                    <FloatingLabel label="ID Categoría Padre (opcional)">
                        <Form.Control style={{ width: "20rem", }} value={`${updateCategory.idCategoriaPadre}`} type="text" name='idCategoriaPadre' onChange={handleChangeInputs} />
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
