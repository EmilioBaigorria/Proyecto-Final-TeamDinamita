import { FC } from "react"
import { ICategorias } from "../../../types/dtos/categorias/ICategorias"
import styles from "./CategoryDropdown.module.css"
import { Button } from "react-bootstrap"

interface ICategoryDropdown{
    category:ICategorias
}
export const CategoryDropdown :FC<ICategoryDropdown> = ({category}) => {
return (
    <>
    
        <div className={styles.main_container}>
            <div className={styles.main_upper_container}>
                <h3 style={{fontSize:"1.6rem"}}>{category.denominacion}</h3>
                <div className={styles.buttons_container}>
                    <Button variant="light">
                    <span className="material-symbols-outlined">
                        arrow_drop_down
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
            <div className={styles.main_dropdown_container}>
                    
            </div>
        </div>
    </>
)
}
