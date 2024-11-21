import { FC, useEffect, useState } from "react";
import { ProductoService } from "../../../services/ProductoService";
import { IProductos } from "../../../types/dtos/productos/IProductos";
import { ISucursal } from "../../../types/dtos/sucursal/ISucursal";
import { ProductoCard } from "../ProductoCard/ProductoCard";
import { PopUpCreateUpdateProducto } from "../../pages/PopUpCreateEditProducto/CreateEditProductModal"; 
import styles from "./ProductosPage.module.css";

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux/store/store";
import { setProductos } from "../../../redux/slices/productosSlice";


const API_URL = import.meta.env.VITE_API_URL;

interface IProductosPage {
  office: ISucursal | null;
}

export const ProductosPage: FC<IProductosPage> = ({ office }) => {
  //if(office) console.log("LOGDAVID | Office: ", office.nombre, " ID", office.id)
  const productos = useSelector((state :RootState) => state.productos.productos)
  const dispatch = useDispatch()

  const productoService = new ProductoService(API_URL);

  const [displayCreateUpdateProducto, setDisplayCreateUpdateProducto] = useState<boolean>(false); 
  const [isCreate, setIsCreate] = useState<boolean>(true);

  const [currentPage, setCurrentPage] = useState<number>(1);

  const pageSize = 6;
  const indexOfLastProduct = currentPage * pageSize;
  const indexOfFirstProduct = indexOfLastProduct - pageSize;
  const currentProducts = productos.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(productos.length / pageSize);

  useEffect(() => {
    const produGet = async () => {
      try {
        if (office) {
          const listProducts = await productoService.articulosPorSucursalId(office.id);
          if(listProducts) dispatch(setProductos(listProducts))
        }
      } catch (error) {
        console.log("Hubo un error buscando los productos", error);
      }
    };

    if (office) produGet();
    
  }, [office]);

  const handleOpenModal = () => {
    setIsCreate(true); 
    setDisplayCreateUpdateProducto(true);
  };

  return (
    <>
      {!office && <h2>Seleccione sucursal.</h2>}

      { office && 
      <div className={styles.button_container}>
        <button className="btnAdd" onClick={handleOpenModal}>
          AGREGAR PRODUCTO
        </button>
      </div>      
      }

      { productos && 
      <div className={styles.main_products_container}>
        <div className={styles.products_container}>
          {productos ? (
            currentProducts.map((product) => (
              <ProductoCard product={product} key={product.id} />
            ))
          ) : (
            <h2>Hubo un error con los productos</h2>
          )}
        </div>
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
      </div>      
      }

      {/* Modal de Crear/Actualizar Producto */}
      <PopUpCreateUpdateProducto
        displayCreateUpdateProducto={displayCreateUpdateProducto}
        setDisplayCreateUpdateProducto={setDisplayCreateUpdateProducto}
        isCreate={isCreate}
      />
    </>
  );
};
