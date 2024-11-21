import { FC } from 'react';
import { IProductos } from '../../../types/dtos/productos/IProductos';
import styles from './ProductoCard.module.css';
import { Button } from 'react-bootstrap';

interface IProductoCard {
    product: IProductos;
}

export const ProductoCard: FC<IProductoCard> = ({ product }) => {

    const handleEditModal = () =>{

    }
    const handleDeleteProducto = () =>{

    }
    
    return (
        <div className={styles.card}>
            <img
                className={styles.cardImage}
                src={
                    product.imagenes[0]
                        ? product.imagenes[0].url
                        : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSMeVgKGC9MMGYtkEoy3zKDpVHa2BPZYWmOfg&s"
                }
                alt={product.denominacion}
            />
            <div className={styles.cardBody}>
                <h3 className={styles.cardTitle}>{product.denominacion}</h3>
                <p className={styles.cardText}>{product.descripcion}</p>
                <p className={`${styles.cardText} ${styles.cardPrice}`}>
                    {product.precioVenta}$
                </p>
                <div className={styles.btnsContainer}>
                    <Button variant="outline-primary" onClick={handleEditModal}>
                        <span className="material-symbols-outlined">edit</span>
                    </Button>
                    <Button variant="outline-danger" onClick={handleDeleteProducto}>
                        <span className="material-symbols-outlined">delete</span>
                    </Button>
                </div>
            </div>
        </div>
    );
};
