import { FC, useEffect, useState } from "react"
import { ISucursal } from "../../../types/dtos/sucursal/ISucursal"
import { CategoriaService } from "../../../services/CategoriaService"
import { ICategorias } from "../../../types/dtos/categorias/ICategorias";
import { CategoryDropdown } from "../CategoryDropdown/CategoryDropdown";
import styles from "../CategoriasPage/CategoriasPage.module.css"

const API_URL = import.meta.env.VITE_API_URL;

interface ICategoriasPage {
    office: ISucursal | null
}

export const CategoriasPage: FC<ICategoriasPage> = ({ office }) => {

    const cateService = new CategoriaService(API_URL)
    const [categories, setCategories] = useState<ICategorias[] | null>([])

    useEffect(() => {
        const getCate = async () => {
            try {
                const categoryData = await cateService.todasCategoriasPadresPorSucursal(Number(office?.id))
                setCategories(categoryData)
            } catch (error) {
                console.log("Hubo un error con el fetch de las categorias: ", error)
            }
        }
        getCate()

    }, [office?.id])

    return (
        <div style={{ overflow: "auto" }}>
            <div className={styles.button_container}>
                <button className="btnAdd">AGREGAR CATEGORIA</button>
            </div>
            <h2>{office ? office.nombre : "Hubo un error."}</h2>
            <div style={{
                width: "90%",
                display: "flex",
                flexDirection: "column",

            }}>
                {categories?.map((cate) => (
                    <CategoryDropdown key={cate.id} category={cate} idSucursal={office!.id} />
                ))
                }
            </div>
        </div>
    )
}
