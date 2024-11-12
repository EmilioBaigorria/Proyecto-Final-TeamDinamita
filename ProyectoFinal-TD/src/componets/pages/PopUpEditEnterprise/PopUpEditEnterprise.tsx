import { FC, useEffect, useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { useAppSelector } from "../../../hooks/redux";
import { IEmpresa } from "../../../types/dtos/empresa/IEmpresa";
import { EmpresaService } from "../../../services/EmpresaService";
import { UploadImage } from "../../UploadImage";

interface IDisplayPopUp{
    display:boolean,
    setDisplay:Function
}

export const EditEnterpriseModal: FC<IDisplayPopUp> = ({ display, setDisplay }) => {

    const elementActive: IEmpresa = useAppSelector(
        (state) => state.ActiveEntrepriseReducer.activeEnterprise
    );

    // Estado para los campos editables
    const [nombre, setNombre] = useState("");
    const [razonSocial, setRazonSocial] = useState("");
    const [cuit, setCuit] = useState("");
    const [logo, setLogo] = useState<string | null>(null);
    
    const API_URL = import.meta.env.VITE_API_URL;

    useEffect(() => {
        if (elementActive) {
            setNombre(elementActive.nombre || "");
            setRazonSocial(elementActive.razonSocial || "");
            setCuit(elementActive.cuit ? elementActive.cuit.toString() : "");
            setLogo(elementActive.logo || "");
        }
    }, [elementActive]);

    const handleClose = ()=>{
        setDisplay(false)
    }

    const handleSaveChanges = async ()  => {
        const id = elementActive.id;
        const updatedEnterprise: IEmpresa = {
            ...elementActive,
            nombre,
            razonSocial,
            cuit: Number.parseInt(cuit.toString()),
            logo,
        };

        try {
            const update = await new EmpresaService(API_URL + "/empresas").put(Number(id),updatedEnterprise);
            handleClose(); // Cierra el modal
        } catch (err) {
            console.error("Error al editar  empresa:", err);
        }
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
                    <label>Logo:</label>
                        <UploadImage image={logo} setImage={setLogo} />
                        {/*
                            <label>Logo URL:</label>
                        <input
                            type="text"
                            value={logo}
                            onChange={(e) => setLogo(e.target.value)}
                            className="form-control"
                        />
                        */}
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
