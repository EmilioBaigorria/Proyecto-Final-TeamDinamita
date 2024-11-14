import { FC } from "react"
import { CategoriasPage } from "../ui/CategoriasPage/CategoriasPage"
import { ProductosPage } from "../ui/ProductosPage/ProductosPage"
import { AlergenosPage } from "../ui/AlergenosPage/AlergenosPage"
import { useAppSelector } from "../../hooks/redux"

interface IAdministracion{
  activeSubPage:string
}
const Administration: FC<IAdministracion> = ({activeSubPage}) => {
  const activeOffice=useAppSelector(
    (state)=>state.ActiveOfficeReducer.activeOffice
  )
  return (
    <main>
      {activeSubPage=="categorias"?<CategoriasPage office={activeOffice}/>:
      activeSubPage=="productos"? <ProductosPage/>:
      activeSubPage=="alergenos"?<AlergenosPage/>:
      <div><h1>Administracion</h1></div>}
    </main> 
  )
}

export default Administration