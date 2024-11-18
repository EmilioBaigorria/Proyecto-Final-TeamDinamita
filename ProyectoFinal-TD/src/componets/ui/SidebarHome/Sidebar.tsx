import { useLocation } from 'react-router-dom'

import Card from '../CompanyCard/Card';
import { FC, useEffect, useState } from 'react';
import { EmpresaService } from '../../../services/EmpresaService';
import { IEmpresa } from '../../../types/dtos/empresa/IEmpresa';
import { Button } from 'react-bootstrap';
import styles from "./SidebarHome.module.css"

const API_URL = import.meta.env.VITE_API_URL;


interface IDisplayPopUp {
  setDisplay: Function
  setdisplayModalCheckEnterprise: Function
  setDisplayModalEditEnterprise: Function
  setActiveSubPage: Function

}

const Sidebar: FC<IDisplayPopUp> = ({ setDisplay, setdisplayModalCheckEnterprise, setDisplayModalEditEnterprise, setActiveSubPage }) => {
  const [enterprises, setEnterprises] = useState<IEmpresa[]>([])
 
 
  const location = useLocation(); // Obtener la ubicación actual

  const handleActiveSubPageChange = (event: React.MouseEvent<HTMLButtonElement>) => {
    const { name } = event.currentTarget
    setActiveSubPage(name)
  }

  const [isAsideOpen, setIsAsideOpen] = useState(true);

  const toggleAside = () => {
    setIsAsideOpen(!isAsideOpen);
  };
 
  useEffect(() => {
    const fetchEmpresas = async () => {
      try {
        //consulto todas las empresas

        const empresas = await new EmpresaService(API_URL + "/empresas").getAll();
        console.log("---------- Todas las empresas ----------");
        console.log(empresas);
        setEnterprises(Array.isArray(empresas) ? empresas : [empresas])
      } catch (err) {
        console.error("Error al cargar las empresas:", err);
      }
    };

    fetchEmpresas();
  }, []);



  return (
    <aside className={isAsideOpen ? 'opened' : ''}>
      <button
        className={`hamburger`}
        onClick={toggleAside}
      >
        <i className="bi bi-list burgerIco"></i>
      </button>
      {location.pathname === '/' && (
        <>
          <h2>Empresas</h2>

          <button className='btnAdd' onClick={() => {
            setDisplay(true)
          }}>AGREGAR EMPRESA</button>

          <div className="cardContainer_aside">
            {
              enterprises.map((empresa => {
                return <Card key={empresa.id}
                  item={empresa}
                  setdisplayModalCheckEnterprise={setdisplayModalCheckEnterprise}
                  setDisplayModalEditEnterprise={setDisplayModalEditEnterprise}
                />
              }))
            }
          </div>
        </>
      )}

      {location.pathname === '/admin' && (
        <div className={styles.button_container}>
          <h2>Administracion</h2>
          <Button variant="light" className={styles.button_styles} onClick={handleActiveSubPageChange} name='categorias'>Categorias</Button>
          <Button variant="light" className={styles.button_styles} onClick={handleActiveSubPageChange} name='productos'>Productos</Button>
          <Button variant="light" className={styles.button_styles} onClick={handleActiveSubPageChange} name='alergenos'>Alergenos</Button>
        </div>
      )}
    </aside>
  );
};

export default Sidebar;