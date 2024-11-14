import { FC } from "react"
import { ISucursal } from "../../../types/dtos/sucursal/ISucursal"
import { Button } from "react-bootstrap"

interface ICategoriasPage{
  office:ISucursal|null
}

export const CategoriasPage:FC<ICategoriasPage> = ({office}) => {
  const handleuwumoment=()=>{
    console.log(office?.categorias)
  }
  return (
    <div>CategoriasPage
      <h2>{office ? office.nombre: "hubo un error"}</h2>
      <Button variant="light" onClick={handleuwumoment}>Tocame uwu</Button>
    </div>
  )
}
