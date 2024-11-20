import { FC } from "react"
import { CategoriasPage } from "../ui/CategoriasPage/CategoriasPage"
import { ProductosPage } from "../ui/ProductosPage/ProductosPage"
import { AlergenosPage } from "../ui/AlergenosPage/AlergenosPage"
import { useAppSelector } from "../../hooks/redux"

interface IAdministracion{
  activeSubPage:string
  setDisplayCreateUpdateAlergeno:Function
  setIsCreate:Function
}
const Administration: FC<IAdministracion> = ({activeSubPage,setDisplayCreateUpdateAlergeno,setIsCreate}) => {
  const activeOffice=useAppSelector(
    (state)=>state.ActiveOfficeReducer.activeOffice
  )
  return (
    <main>
      {activeSubPage=="categorias"?<CategoriasPage office={activeOffice}/>:
      activeSubPage=="productos"? <ProductosPage office={activeOffice}/>:
      activeSubPage=="alergenos"?<AlergenosPage 
      setDisplayCreateUpdateAlergeno={setDisplayCreateUpdateAlergeno}
      setIsCreate={setIsCreate}
      />:
      <div><h1>Administracion</h1></div>}
    </main> 
  )
}

export default Administration