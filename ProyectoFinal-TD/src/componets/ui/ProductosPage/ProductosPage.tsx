import React, { FC, useEffect, useState } from "react";
import { ProductoService } from "../../../services/ProductoService";
import { IProductos } from "../../../types/dtos/productos/IProductos";
import { ISucursal } from "../../../types/dtos/sucursal/ISucursal";
import { ProductoCard } from "../ProductoCard/ProductoCard";
import { PopUpCreateUpdateProducto } from "../../pages/PopUpCreateEditProducto/CreateEditProductModal";
import styles from "./ProductosPage.module.css";
import stylesAdmin from "../../pages/Administration.module.css"
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux/store/store";
import { setProductos } from "../../../redux/slices/productosSlice";

const API_URL = import.meta.env.VITE_API_URL;

interface IProductosPage {
  office: ISucursal | null;
}

export const ProductosPage: FC<IProductosPage> = ({ office }) => {
  const productos = useSelector((state: RootState) => state.productos.productos);
  const dispatch = useDispatch();
  const productoService = new ProductoService(API_URL);

  const [displayCreateUpdateProducto, setDisplayCreateUpdateProducto] = useState<boolean>(false);
  const [isCreate, setIsCreate] = useState<boolean>(true);
  const [selectedProduct, setSelectedProduct] = useState<IProductos | null>(null);

  const [currentPage, setCurrentPage] = useState<number>(1);

  const pageSize = 6;
  const indexOfLastProduct = currentPage * pageSize;
  const indexOfFirstProduct = indexOfLastProduct - pageSize;
  const currentProducts = productos.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(productos.length / pageSize);

  useEffect(() => {
    if (!office) return; // Evita ejecutar código si `office` es null

    const fetchProducts = async () => {
      try {
        const listProducts = await productoService.articulosPorSucursalId(office.id);
        if (listProducts) dispatch(setProductos(listProducts));
      } catch (error) {
        console.error("Error al obtener productos:", error);
      }
    };
    fetchProducts();
  }, [dispatch, office, productoService]);

  const handleOpenModal = () => {
    setIsCreate(true);
    setSelectedProduct(null);
    setDisplayCreateUpdateProducto(true);
  };

  const handleEditProduct = (product: IProductos) => {
    setSelectedProduct(product);
    setIsCreate(false);
    setDisplayCreateUpdateProducto(true);
  };

  const handleDeleteProduct = async (product: IProductos) => {
    try {
      await productoService.deleteProducto(product.id);
      console.log("Producto eliminado con éxito");
    } catch (error) {
      console.error("Error al eliminar producto:", error);
    }
  };

  return (
    <>

      {!office ? (
        <>
          <h1>Productos</h1>
          <div className={stylesAdmin.noActiveOfficeContainer}>
            <div className={stylesAdmin.noActiveOfficeMessage}>
              <h2>Seleccione una empresa y sucursal para continuar</h2>
              <p>Seleccione una empresa y luego una sucursal para realizar acciones.</p>
            </div>
          </div>
        </>
      ) : (
        <>

          <div className={styles.button_container}>
            <button className="btnAdd" onClick={handleOpenModal}>AGREGAR PRODUCTO</button>
          </div>
          <div className={styles.products_container}>
            {currentProducts.map(product => (
              <ProductoCard
                key={product.id}
                product={product}
                onEdit={handleEditProduct}
                onDelete={handleDeleteProduct}
              />
            ))}

            
            <div className={styles.pagination_container}>
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
              >
                Anterior
              </button>
              <span>Página {currentPage} de {totalPages}</span>
              <button
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
              >
                Siguiente
              </button>
            </div>

            <PopUpCreateUpdateProducto
              displayCreateUpdateProducto={displayCreateUpdateProducto}
              setDisplayCreateUpdateProducto={setDisplayCreateUpdateProducto}
              isCreate={isCreate}
              onClose={setIsCreate}
              selectedProduct={selectedProduct}
            />
          </div>
        </>
      )}
    </>
  );
}