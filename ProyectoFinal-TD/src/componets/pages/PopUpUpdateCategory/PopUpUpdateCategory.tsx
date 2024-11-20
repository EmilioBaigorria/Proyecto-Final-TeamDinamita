import { FC, useEffect, useState } from "react";
import { Button, FloatingLabel, Form } from "react-bootstrap";
import Styles from "./PopUpUpdateCategory.module.css";
import { IUpdateCategoria } from "../../../types/dtos/categorias/IUpdateCategoria";

interface IPopUpUpdateCategory {
    display: boolean;
    setDisplay: (value: boolean) => void;
    categoria?: IUpdateCategoria | null;
    onSave: (updatedCategoria: IUpdateCategoria) => void;
}

export const PopUpUpdateCategory: FC<IPopUpUpdateCategory> = ({ display, setDisplay, categoria, onSave }) => {

    const [name, setName] = useState("");
    const [eliminado, setEliminado] = useState(false);
    const [idCategoriaPadre, setIdCategoriaPadre] = useState<number | null>(null);

    // Inicializa los campos con los datos de la cat
    useEffect(() => {
        if (categoria) {
            setName(categoria.denominacion || "");
            setEliminado(categoria.eliminado || false);
            setIdCategoriaPadre(categoria.idCategoriaPadre || null);
        }
    }, [categoria]);

    const handleUpdate = () => {
        if (categoria) {
            const updatedCategoria: IUpdateCategoria = {
                ...categoria,
                denominacion: name,
                eliminado,
                idCategoriaPadre,
            };
            onSave(updatedCategoria); // Guarda lo pasado en los campos
            setDisplay(false); // Cierra el popup
        }
    };

    return (
        <div
            className={Styles.main_background_container}
            style={{
                display: display ? "flex" : "none",
            }}
        >
            <div className={Styles.main_content_container}>
                <h2>Editar Categoría</h2>

                <FloatingLabel label="Denominación">
                    <Form.Control
                        style={{ width: "20rem" }}
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </FloatingLabel>

                <Form.Check
                    type="checkbox"
                    label="Eliminado"
                    checked={eliminado}
                    onChange={(e) => setEliminado(e.target.checked)}
                />

                <FloatingLabel label="ID Categoría Padre (opcional)">
                    <Form.Control
                        style={{ width: "20rem" }}
                        type="number"
                        value={idCategoriaPadre || ""}
                        onChange={(e) => setIdCategoriaPadre(Number(e.target.value) || null)}
                    />
                </FloatingLabel>

                <div className={Styles.main_button_container}>
                    <Button variant="danger" onClick={() => setDisplay(false)}>
                        Cancelar
                    </Button>
                    <Button
                        variant="success"
                        onClick={() => {
                            handleUpdate();
                            setDisplay(false);
                        }}
                    >
                        Aceptar
                    </Button>

                </div>
            </div>
        </div>
    );
};
