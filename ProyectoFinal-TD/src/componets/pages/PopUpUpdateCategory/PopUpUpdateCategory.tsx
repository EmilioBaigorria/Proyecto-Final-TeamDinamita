import { ChangeEvent, FC, useEffect, useState } from "react";
import { IUpdateCategoria } from "../../../types/dtos/categorias/IUpdateCategoria";
import { ICategorias } from "../../../types/dtos/categorias/ICategorias";
import { useAppSelector } from "../../../hooks/redux";
import { Button, FloatingLabel, Form, Modal } from "react-bootstrap";

interface IUpdateCategoryModalProps {
    display: boolean;              // Propiedad para manejar la visibilidad del popup
    setDisplay: Function;          // Funcion para cambiar la visibilidad del popup
    category: ICategorias;         // Datos de la categoria a editar
}

export const PopUpUpdateCategory: FC<IUpdateCategoryModalProps> = ({ display, setDisplay, category }) => {


    const sucursales: number[] = []
    category.sucursales.map((sucur) => (
        sucursales.push(sucur.id)
    ))

    const initialValues: IUpdateCategoria = {
        id: category.id,
        denominacion: category.denominacion,
        eliminado: category.eliminado,
        idSucursales: sucursales,
        idEmpresa: Number(useAppSelector((state) => {
            state.ActiveEntrepriseReducer.activeEnterprise?.id
        })),
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

    const handleSaveChanges = () => {

        // 1) cuerpo del modal, 2) 
    }

    const handleChangeInputs = (event: ChangeEvent<HTMLInputElement>) => {
        const {value, name} = event.target
        setUpdateCategory((prev)=>({...prev, [`${name}`]: value}))
    }

    return (
        <>
            <Modal show={display} onHide={handleCloseModal}>

                <Modal.Header>
                    <Modal.Title>Modificar Categoria</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                
                    <FloatingLabel label="Denominación">
                        <Form.Control style={{ width: "20rem", }} value={`${updateCategory.denominacion}`} type="text" name='denominacion' onChange={handleChangeInputs} required/>
                    </FloatingLabel>

                    <FloatingLabel label="Eliminado">
                        <Form.Control style={{ width: "20rem", }} value={`${updateCategory.eliminado}`} type="text" name='eliminado' onChange={handleChangeInputs} required/>
                    </FloatingLabel>

                    <FloatingLabel label="ID Empresa">
                        <Form.Control style={{ width: "20rem", }} value={`${updateCategory.idEmpresa}`} type="text" name='idEmpresa' onChange={handleChangeInputs} required/>
                    </FloatingLabel>

                    <FloatingLabel label="ID Categoría Padre (opcional)">
                        <Form.Control style={{ width: "20rem", }} value={`${updateCategory.idCategoriaPadre}`} type="text" name='idCategoriaPadre' onChange={handleChangeInputs}/>
                    </FloatingLabel>

                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>
                        Cancelar
                    </Button>
                    <Button variant="primary" onClick={handleChangeInputs}>
                        Guardar cambios
                    </Button>
                </Modal.Footer>

            </Modal>
        </>
    )
}
