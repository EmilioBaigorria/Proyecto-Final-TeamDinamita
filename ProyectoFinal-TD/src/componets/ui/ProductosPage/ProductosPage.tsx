import { FC, useEffect, useState } from "react";
import { ProductoService } from "../../../services/ProductoService";
import { IProductos } from "../../../types/dtos/productos/IProductos";
import { ISucursal } from "../../../types/dtos/sucursal/ISucursal";
import { ProductoCard } from "../ProductoCard/ProductoCard";
import { PopUpCreateUpdateProducto } from "../../pages/PopUpCreateEditProducto/CreateEditProductModal"; 
import styles from "./ProductosPage.module.css";

const API_URL = import.meta.env.VITE_API_URL;

interface IProductosPage {
  office: ISucursal | null;
}

export const ProductosPage: FC<IProductosPage> = ({ office }) => {
  const productoService = new ProductoService(API_URL);
  const [products, setProducts] = useState<IProductos[] | null>(null);
  const [displayCreateUpdateProducto, setDisplayCreateUpdateProducto] = useState<boolean>(false); 
  const [isCreate, setIsCreate] = useState<boolean>(true);

  useEffect(() => {
    const produGet = async () => {
      try {
        if (office) {
          const productData = await productoService.articulosPorSucursalId(office?.id);
          setProducts(productData);
          await console.log(products);
        }
      } catch (error) {
        console.log("Hubo un error buscando los productos", error);
      }
    };
    produGet();
  }, [office]);

  const handleOpenModal = () => {
    setIsCreate(true); 
    setDisplayCreateUpdateProducto(true);
  };

  return (
    <>
      {!office && <h2>Seleccione sucursal.</h2>}

      <div className={styles.button_container}>
        <button className="btnAdd" onClick={handleOpenModal}>
          AGREGAR PRODUCTO
        </button>
      </div>

      <div className={styles.main_products_container}>
        <div className={styles.products_container}>
          {products ? (
            products.map((product) => (
              <ProductoCard product={product} key={product.id} />
            ))
          ) : (
            <h2>Hubo un error con los productos</h2>
          )}
        </div>
      </div>

      {/* Modal de Crear/Actualizar Producto */}
      <PopUpCreateUpdateProducto
        displayCreateUpdateProducto={displayCreateUpdateProducto}
        setDisplayCreateUpdateProducto={setDisplayCreateUpdateProducto}
        isCreate={isCreate}
      />
    </>
  );
};
