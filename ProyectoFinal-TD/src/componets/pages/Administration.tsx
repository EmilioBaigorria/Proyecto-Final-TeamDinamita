import { FC } from "react"
import { CategoriasPage } from "../ui/CategoriasPage/CategoriasPage"
import { ProductosPage } from "../ui/ProductosPage/ProductosPage"
import { AlergenosPage } from "../ui/AlergenosPage/AlergenosPage"
import { useAppSelector } from "../../hooks/redux"
import styles from './Administration.module.css'

interface IAdministracion {
  activeSubPage: string
  setDisplayCreateUpdateAlergeno: Function
  setIsCreate: Function
}
const Administration: FC<IAdministracion> = ({ activeSubPage, setDisplayCreateUpdateAlergeno, setIsCreate }) => {
  const activeOffice = useAppSelector(
    (state) => state.ActiveOfficeReducer.activeOffice
  )
  return (
    <main style={{height:"100vh"}}>
      {activeSubPage == "categorias" ? <CategoriasPage office={activeOffice} /> :
        activeSubPage == "productos" ? <ProductosPage office={activeOffice} /> :
          activeSubPage == "alergenos" ? <AlergenosPage
            setDisplayCreateUpdateAlergeno={setDisplayCreateUpdateAlergeno}
            setIsCreate={setIsCreate}
          /> :
            <div>
              <h1>Administracion</h1>
              {!activeOffice && (
                <div className={styles.noActiveOfficeContainer}>
                  <div className={styles.noActiveOfficeMessage}>
                    <h2>Seleccione una empresa y sucursal para continuar</h2>
                    <p>Seleccione una empresa y luego una sucursal para realizar acciones.</p>
                  </div>
                </div>
              )}
            </div>}
    </main>
  )
}

export default Administration