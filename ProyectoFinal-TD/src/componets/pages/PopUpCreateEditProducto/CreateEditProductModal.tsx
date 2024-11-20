import { ChangeEvent, FC, useState, useEffect } from 'react'
import { Button, FloatingLabel, Form, Modal } from 'react-bootstrap'
import { ICreateProducto } from '../../../types/dtos/productos/ICreateProducto'
import { IUpdateProducto } from '../../../types/dtos/productos/IUpdateProducto'
import { UploadImage } from '../../UploadImage'

import { useAppDispatch, useAppSelector } from '../../../hooks/redux'
import { ProductoService } from '../../../services/ProductoService'
import { removeActiveProducto } from '../../../redux/slices/ActiveProductoReducer'

const API_URL = import.meta.env.VITE_API_URL;

interface IPopUpCreateUpdateProducto {
    displayCreateUpdateProducto: boolean;
    setDisplayCreateUpdateProducto: Function;
    isCreate: boolean;
}

export const PopUpCreateUpdateProducto: FC<IPopUpCreateUpdateProducto> = ({ displayCreateUpdateProducto, setDisplayCreateUpdateProducto, isCreate }) => {
    const producto = useAppSelector(state => state.ActiveProductoReducer.activeProducto);
    const dispatch = useAppDispatch();
    const productoService = new ProductoService(API_URL);

    const initialValues: ICreateProducto | IUpdateProducto = isCreate
    ? {
        denominacion: '',
        precioVenta: 0,
        descripcion: '',  
        habilitado: true, 
        codigo: '',       
        idCategoria: 0,   
        idAlergenos: [],  
        imagenes: [{ name: 'default', url: '' }] 
      }
    : {
        id: producto?.id ?? 0,
        denominacion: producto?.denominacion ?? '',
        precioVenta: producto?.precioVenta ?? 0,
        descripcion: producto?.descripcion ?? '', 
        habilitado: producto?.habilitado ?? true,  
        codigo: producto?.codigo ?? '',           
        idCategoria: producto?.categoria.id ?? 0,   
        idAlergenos: producto?.alergenos.map(a => a.id) ?? [],  
        imagenes: producto?.imagenes ?? [{ name: 'default', url: '' }]
      };

    const [newProductoData, setNewProductoData] = useState<ICreateProducto | IUpdateProducto>(initialValues);
    const [logo, setLogo] = useState<string | null>(null);

    // Reset modal state on close
    const handleClose = () => {
        setNewProductoData({
            denominacion: '',
            precioVenta: 0,
            descripcion: '',  
            habilitado: true, 
            codigo: '',       
            idCategoria: 0,   
            idAlergenos: [],  
            imagenes: [{ name: 'default', url: '' }] 
        });
        dispatch(removeActiveProducto());
        setDisplayCreateUpdateProducto(false);
    };

    // Handle Update
    const handleUpdate = async () => {
        if (producto) {
            const updatedProducto: IUpdateProducto = {
                id: producto.id,
                denominacion: newProductoData.denominacion,
                precioVenta: newProductoData.precioVenta,
                descripcion: newProductoData.descripcion,
                habilitado: newProductoData.habilitado,
                codigo: newProductoData.codigo,
                idCategoria: newProductoData.idCategoria,
                idAlergenos: newProductoData.idAlergenos,
                imagenes: newProductoData.imagenes,
            };

            try {
                const response = await productoService.put(producto.id, updatedProducto);
                console.log(response);
            } catch (error) {
                console.error('Error al actualizar el producto:', error);
            }
        }
        handleClose();
    };

    // Handle Create
    const handleCreate = async () => {
        if (!newProductoData.denominacion || !newProductoData.precioVenta || !logo) {
            alert('Por favor, complete todos los campos.');
            return;
        }

        const newProducto: ICreateProducto = {
            denominacion: newProductoData.denominacion,
            precioVenta: newProductoData.precioVenta,
            descripcion: newProductoData.descripcion,
            habilitado: newProductoData.habilitado,
            codigo: newProductoData.codigo,
            idCategoria: newProductoData.idCategoria,
            idAlergenos: newProductoData.idAlergenos,
            imagenes: [{ name: 'newImage', url: String(logo) }]
        };

        try {
            const response = await productoService.post(newProducto);
            console.log(response);
        } catch (error) {
            console.error('Error al crear el producto:', error);
        }
        handleClose();
    };

    // Handle input changes
    const handleChangeInputs = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { value, name } = event.target;
        setNewProductoData(prev => ({ ...prev, [name]: value }));
    };


    useEffect(() => {
        if (!isCreate && producto) {
            setNewProductoData({
                id: producto.id,
                denominacion: producto.denominacion,
                precioVenta: producto.precioVenta,
                descripcion: producto.descripcion,
                habilitado: producto.habilitado,
                codigo: producto.codigo,
                idCategoria: producto.categoria.id,
                idAlergenos: producto.alergenos.map(a => a.id),
                imagenes: producto.imagenes,
            });
            setLogo(producto.imagenes?.[0]?.url || null);
        }
    }, [displayCreateUpdateProducto, isCreate, producto]);

    return (
        <Modal show={displayCreateUpdateProducto} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>{isCreate ? "Crear Producto" : "Editar Producto"}</Modal.Title>
            </Modal.Header>
            <Modal.Body style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "1rem" }}>
                <FloatingLabel label="Nombre del Producto">
                    <Form.Control
                        style={{ width: "20rem" }}
                        type="text"
                        name="denominacion"
                        value={newProductoData.denominacion}
                        //@ts-ignore
                        onChange={handleChangeInputs}
                    />
                </FloatingLabel>

                <FloatingLabel label="Precio de Venta">
                    <Form.Control
                        style={{ width: "20rem" }}
                        type="number"
                        name="precioVenta"
                        value={newProductoData.precioVenta}
                        //@ts-ignore
                        onChange={handleChangeInputs}
                    />
                </FloatingLabel>

                <FloatingLabel label="Descripción">
                    <Form.Control
                        style={{ width: "20rem" }}
                        type="text"
                        name="descripcion"
                        value={newProductoData.descripcion}
                        //@ts-ignore
                        onChange={handleChangeInputs}
                    />
                </FloatingLabel>

                <FloatingLabel label="Código">
                    <Form.Control
                        style={{ width: "20rem" }}
                        type="text"
                        name="codigo"
                        value={newProductoData.codigo}
                        //@ts-ignore
                        onChange={handleChangeInputs}
                    />
                </FloatingLabel>

                <UploadImage image={logo} setImage={setLogo} />
            </Modal.Body>

            <Modal.Footer>
                <Button variant="danger" onClick={handleClose}>
                    Cancelar
                </Button>
                <Button variant="success" onClick={isCreate ? handleCreate : handleUpdate}>
                    {isCreate ? "Crear Producto" : "Actualizar Producto"}
                </Button>
            </Modal.Footer>
        </Modal>
    );
};
