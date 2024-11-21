import { FC } from 'react';
import { IProductos } from '../../../types/dtos/productos/IProductos';
import styles from './ProductoCard.module.css';

interface IProductoCard {
    product: IProductos;
}

export const ProductoCard: FC<IProductoCard> = ({ product }) => {


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
            </div>
        </div>
    );
};
