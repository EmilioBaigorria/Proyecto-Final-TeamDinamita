
import { Button, Card } from 'react-bootstrap'
import { IProductos } from '../../../types/dtos/productos/IProductos'
import { FC } from 'react'


interface IProductoCard{
    product:IProductos
}
export const ProductoCard: FC<IProductoCard> = ({product}) => {
    const handleshwo=()=>{
        console.log(product.imagenes)
    }
return (
    <div>
        <Card style={{ width: '18rem' }}>
        <Card.Img variant="top" src={product.imagenes[0] ? product.imagenes[0].url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSMeVgKGC9MMGYtkEoy3zKDpVHa2BPZYWmOfg&s" } />
        <Card.Body>
            <Card.Title>{product.denominacion}</Card.Title>
            <Card.Text>
                {product.descripcion}
            </Card.Text>
            <Card.Text style={{fontSize:"1.5rem",textAlign:"center"}}>
                {product.precioVenta}$
            </Card.Text>
            
        </Card.Body>
        
        </Card>
    </div>
)}
