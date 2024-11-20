import { FC, useState } from "react"
import { ICategorias } from "../../../types/dtos/categorias/ICategorias"
import styles from "./CategoryDropdown.module.css"
import { Button } from "react-bootstrap"
import { CategoriaService } from "../../../services/CategoriaService"

interface ICategoryDropdown {
    category: ICategorias
    idSucursal: number
}

export const CategoryDropdown: FC<ICategoryDropdown> = ({ category, idSucursal }) => {

    const [subcategories, setSubcategories] = useState<ICategorias[] | null>(null);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    // Esto abre y cierra y maneja el dropdown
    const handleShowSubcategories = async () => {

        // Cambia el estado del dropdown
        setIsDropdownOpen(prev => !prev);

        // Chequea que sea falso y que este no este cargado ya para no sobrecargar a peticiones
        if (!isDropdownOpen && subcategories === null) {

            const categoriaService = new CategoriaService(import.meta.env.VITE_API_URL);
            const subcats = await categoriaService.todasCategoriasHijaPorIdPadre(category.id, idSucursal);

            if (subcats !== null) {
                setSubcategories(subcats);
            } else {
                console.error("No se encontraron subcategorias");
            }
        }
    };   

    return (
        <>

            <div className={styles.main_container}>
                <div className={styles.main_upper_container}>
                    <h3 style={{ fontSize: "1.6rem" }}>{category.denominacion}</h3>
                    <div className={styles.buttons_container}>
                        <Button variant="light" onClick={handleShowSubcategories}>
                            <span className="material-symbols-outlined">
                                {isDropdownOpen ? "arrow_drop_up" : "arrow_drop_down"}
                            </span>
                        </Button>
                        <Button variant="light">
                            <span className="material-symbols-outlined">
                                edit
                            </span>
                        </Button>
                        <Button variant="light">
                            <span className="material-symbols-outlined">
                                add_circle
                            </span>
                        </Button>
                    </div>

                </div>
                
            </div>
        </>
    )
}
