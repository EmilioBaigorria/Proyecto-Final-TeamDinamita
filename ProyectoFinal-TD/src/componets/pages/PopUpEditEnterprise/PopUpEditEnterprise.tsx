import { FC, useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { useAppSelector } from "../../../hooks/redux";
import { IEmpresa } from "../../../types/dtos/empresa/IEmpresa";

interface IDisplayPopUp{
    display:boolean,
    setDisplay:Function
}

export const EditEnterpriseModal: FC<IDisplayPopUp> = ({ display, setDisplay }) => {

    const elementActive: IEmpresa = useAppSelector(
        (state) => state.ActiveEntrepriseReducer.activeEnterprise
    );

    // Estado para los campos editables
    const [nombre, setNombre] = useState(elementActive?.nombre || "");
    const [razonSocial, setRazonSocial] = useState(elementActive?.razonSocial || "");
    const [cuit, setCuit] = useState(elementActive?.cuit || "");
    const [logo, setLogo] = useState(elementActive?.logo || "");

    const handleClose = ()=>{
        setDisplay(false)
    }

    const handleSaveChanges = () => {
        const updatedEnterprise: IEmpresa = {
            ...elementActive,
            nombre,
            razonSocial,
            cuit: Number.parseInt(cuit.toString()),
            logo,
        };
        //Actualizar contacto en servicio
        handleClose(); // Cierra el modal
    };

    return (
        <Modal show={display} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Editar Empresa</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div>
                    <div>
                        <label>Nombre:</label>
                        <input
                            type="text"
                            value={nombre}
                            onChange={(e) => setNombre(e.target.value)}
                            className="form-control"
                        />
                    </div>
                    <div>
                        <label>Razón Social:</label>
                        <input
                            type="text"
                            value={razonSocial}
                            onChange={(e) => setRazonSocial(e.target.value)}
                            className="form-control"
                        />
                    </div>
                    <div>
                        <label>CUIT:</label>
                        <input
                            type="text"
                            value={cuit}
                            onChange={(e) => setCuit(e.target.value)}
                            className="form-control"
                        />
                    </div>
                    <div>
                        <label>Logo URL:</label>
                        <input
                            type="text"
                            value={logo}
                            onChange={(e) => setLogo(e.target.value)}
                            className="form-control"
                        />
                    </div>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Cerrar
                </Button>
                <Button variant="primary" onClick={handleSaveChanges}>
                    Guardar Cambios
                </Button>
            </Modal.Footer>
        </Modal>
    );
};
