import { useLocation } from 'react-router-dom'

import Card from '../CompanyCard/Card';
import { FC, useEffect, useState } from 'react';
import { EmpresaService } from '../../../services/EmpresaService';
import { IEmpresa } from '../../../types/dtos/empresa/IEmpresa';


const API_URL = import.meta.env.VITE_API_URL;


interface IDisplayPopUp{
  setDisplay:Function
  setdisplayModalCheckEnterprise:Function
  setDisplayModalEditEnterprise :Function
}

const Sidebar: FC<IDisplayPopUp> = ({setDisplay,setdisplayModalCheckEnterprise, setDisplayModalEditEnterprise}) => {
  const [enterprises,setEnterprises]=useState<IEmpresa[]>([])
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
  
    
    const location = useLocation(); // Obtener la ubicación actual
  
    
    return (
      <aside>
        
        {location.pathname === '/' && (
          <>
            <h2>Empresas</h2>
  
            <button className='btn btn-light' onClick={()=>{
              setDisplay(true)
            }}>AGREGAR EMPRESA</button>
  
            <div className="cardContainer_aside">
              {
                enterprises.map(( empresa => {
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
          <ul>
            <li>Opción 1</li>
            <li>Opción 2</li>
            <li>Opción 3</li>
          </ul>
        )}
      </aside>
    );
  };

  export default Sidebar;