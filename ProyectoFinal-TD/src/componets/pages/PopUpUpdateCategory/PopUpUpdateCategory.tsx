import { ChangeEvent, FC, useEffect, useState } from "react";
import { IUpdateCategoria } from "../../../types/dtos/categorias/IUpdateCategoria";
import { ICategorias } from "../../../types/dtos/categorias/ICategorias";
import { useAppSelector } from "../../../hooks/redux";
import { Button, Modal } from "react-bootstrap";

interface IUpdateCategoryModalProps {
    display: boolean;                                       // Propiedad para manejar la visibilidad del popup
    setDisplay: Function;                                   // Funcion para cambiar la visibilidad del popup
    category: ICategorias;                           // Datos de la categoria a editar
}

//////////////////////////////////////////////////////////////////////////////////
//                                                                              //
//   ELIMINAR EL ARCHIVO DUPLICADO DE MASSSSSS NO SEAS MOGOLICO NO TE OLVIDES   //
//                                                                              //
//////////////////////////////////////////////////////////////////////////////////


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

    }

    const handleChangeInputs = (event: ChangeEvent<HTMLInputElement>)=>{
        // const {value, name} = event.target
        // setNewAlergenosData((prev)=>({...prev, [`${name}`]: value}))
    }

    return (
        <>
            <Modal show={display} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Modificar Categoria</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {category.denominacion}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleCloseModal}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}
