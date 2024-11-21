import { useLocation } from 'react-router-dom';
import Card from '../CompanyCard/Card';
import { FC, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../redux/store/store';
import { setEmpresas } from '../../../redux/slices/empresasSlice';
import { EmpresaService } from '../../../services/EmpresaService';
import { Button } from 'react-bootstrap';
import styles from './SidebarHome.module.css';
import { IEmpresa } from '../../../types/dtos/empresa/IEmpresa';

const API_URL = import.meta.env.VITE_API_URL;

interface IDisplayPopUp {
  setDisplay: Function;
  setdisplayModalCheckEnterprise: Function;
  setDisplayModalEditEnterprise: Function;
  setActiveSubPage: Function;
  refreshEnterprise: Boolean
}

const Sidebar: FC<IDisplayPopUp> = ({
  setDisplay,
  setdisplayModalCheckEnterprise,
  setDisplayModalEditEnterprise,
  setActiveSubPage,
  refreshEnterprise
}) => {
  const enterprises = useSelector((state: RootState) => state.enterprises.enterprises); // Estado global
  const dispatch = useDispatch();
  const location = useLocation();

  const handleActiveSubPageChange = (event: React.MouseEvent<HTMLButtonElement>) => {
    const option = event.currentTarget.textContent?.toLowerCase();
    console.log(option)
    setActiveSubPage(option);
  };

  const [isAsideOpen, setIsAsideOpen] = useState(true);

  const toggleAside = () => {
    setIsAsideOpen(!isAsideOpen);
  };

  useEffect(() => {
    const fetchEmpresas = async () => {
      try {
        const empresas = await new EmpresaService(`${API_URL}/empresas`).getAll();
        console.log("Empresas obtenidas:", empresas);

        dispatch(setEmpresas(Array.isArray(empresas) ? empresas : [empresas]));
      } catch (err) {
        console.error("Error al cargar las empresas:", err);
      }
    };

    fetchEmpresas();
  }, []);

  useEffect(() => {
    if (!refreshEnterprise) {
      return;
    }
    const fetchEmpresas = async () => {
      try {
        const empresas = await new EmpresaService(`${API_URL}/empresas`).getAll();
        dispatch(setEmpresas(Array.isArray(empresas) ? empresas : [empresas]));
      } catch (err) {
      }
    };
    fetchEmpresas();
  }, [refreshEnterprise]);

  return (
    <aside className={isAsideOpen ? 'opened' : ''}>
      <button className="hamburger" onClick={toggleAside}>
        <i className="bi bi-list burgerIco"></i>
      </button>
      {location.pathname === '/' && (
        <>
          <h2>Empresas</h2>

          <button
            className="btnAdd"
            onClick={() => {
              setDisplay(true);
            }}
          >
            AGREGAR EMPRESA
          </button>

          <div className="cardContainer_aside">
            {enterprises.map((empresa: IEmpresa) => (
              <Card
                key={empresa.id}
                item={empresa}
                setdisplayModalCheckEnterprise={setdisplayModalCheckEnterprise}
                setDisplayModalEditEnterprise={setDisplayModalEditEnterprise}
              />
            ))}
          </div>
        </>
      )}

      {location.pathname === '/admin' && (
        <div className={styles.button_container}>
          <h2>Administración</h2>
          
            <button className='btnAdd' name="categorias" onClick={handleActiveSubPageChange}>CATEGORIAS</button>
            <button className='btnAdd' onClick={handleActiveSubPageChange}>PRODUCTOS</button>
            <button className='btnAdd' onClick={handleActiveSubPageChange}>ALERGENOS</button>
        </div>
      )}
    </aside>
  );
};

export default Sidebar;
