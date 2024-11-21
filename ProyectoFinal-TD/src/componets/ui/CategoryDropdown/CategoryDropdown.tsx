import { FC, useState } from "react"
import { ICategorias } from "../../../types/dtos/categorias/ICategorias"
import styles from "./CategoryDropdown.module.css"
import { Button } from "react-bootstrap"
import { CategoriaService } from "../../../services/CategoriaService"
import { PopUpUpdateCategory } from "../../pages/PopUpUpdateCategory/PopUpUpdateCategory"

interface ICategoryDropdown {
    category: ICategorias
    idSucursal: number
    refreshCategoryFather: Function
}

export const CategoryDropdown: FC<ICategoryDropdown> = ({ category, idSucursal, refreshCategoryFather }) => {

    // UseState para guardar subcategorias y estado del dropdown
    const [subcategories, setSubcategories] = useState<ICategorias[] | null>(null);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    // guardado de estados del display y de la categoria activa para mostrar los datos mientras se edita
    const [displayModal, setDisplayModal] = useState(false)
    const [activeCategory, setActiveCategory] = useState<ICategorias | null>(null)
    refreshCategoryFather(false);

    // Abridor del popup para categ
    const handleOpenModalCat = () => {
        setActiveCategory(category)
        setDisplayModal(true)
    }


    // Dummie obj para pruebas y evitar problemas
    const defaultValues: ICategorias = {
        id: 15,
        denominacion: "string",
        eliminado: false,
        sucursales: [],
        subCategorias: [],
        categoriaPadre: null,
        articulos: category.articulos,
    }

    // Esto abre y cierra y maneja el dropdown
    const handleShowSubcategories = async () => {

        // Cambia el estado del dropdown
        setIsDropdownOpen(prev => !prev);

        // Chequea que sea falso y que este no este cargado ya para no sobrecargar a peticiones
        if (!isDropdownOpen && subcategories === null) {

            const categoriaService = new CategoriaService(import.meta.env.VITE_API_URL);
            const subcategories = await categoriaService.todasCategoriasHijaPorIdPadre(category.id, idSucursal);

            if (subcategories !== null) {
                setSubcategories(subcategories);
            } else {
                console.error("No se encontraron subcategorias");
            }
        }
    };

    const refreshCategory = async () => {
            const categoriaService = new CategoriaService(import.meta.env.VITE_API_URL);
            const subcategories = await categoriaService.todasCategoriasHijaPorIdPadre(category.id, idSucursal);
            if (subcategories !== null) {
                setSubcategories(subcategories);
            } else {
                console.error("No se encontraron subcategorias");
            }
            refreshCategoryFather(true);
    };

    return (
        <>
            <PopUpUpdateCategory display={displayModal} setDisplay={setDisplayModal} category={activeCategory ? activeCategory : defaultValues} refreshCategory={refreshCategory} />
            <div className={styles.main_container}>
                <div className={styles.main_upper_container}>
                    <h3 style={{ fontSize: "1.6rem" }}>{category.denominacion}</h3>
                    <div className={styles.buttons_container}>
                        <Button variant="light" onClick={handleShowSubcategories}>
                            <span className="material-symbols-outlined">
                                {isDropdownOpen ? "arrow_drop_up" : "arrow_drop_down"}
                            </span>
                        </Button>
                        <Button variant="light" onClick={handleOpenModalCat}>
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

                {isDropdownOpen && subcategories && (
                    <div className={styles.main_dropdown_container}>
                        {/* forEach para mapear y renderizar */}
                        {subcategories.map((sub) => (
                            <div key={sub.id} className={styles.subcategory_item}>
                                <p>{sub.denominacion}</p>
                                {/* funcion para manejar el onclick y que solo traiga una de las subcat renderizadas */}
                                <Button variant="light" onClick={() => {
                                    setActiveCategory(sub)
                                    setDisplayModal(true)
                                    console.log("Hola");
                                    
                                }}>
                                    <span className="material-symbols-outlined">edit</span>
                                </Button>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </>
    )
}
